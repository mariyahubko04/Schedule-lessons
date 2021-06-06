import React, { useState } from "react";

import { MenuBlock } from "./MenuBlock";
import { SheduleEditBlock } from "./AdminProfilePageComponents/SheduleEditBlock";
import { BotsPage } from "../ProfilePageComponents/BotsPage";
import { UserInfo } from "../ProfilePageComponents/UserInfo";
import { TeachersInfo } from "../ProfilePageComponents/TeachersInfo";
import { CabinetsPage } from "../ProfilePageComponents/CabinetsPage";
import { SubjectsPage } from "../ProfilePageComponents/SubjectsPage";
import {
    getAllSubjects,
    getAllTeachers,
    getAllCabinets,
    getAllLessonTypes,
    getAllAcademicStatus
} from "../../../../api/getDates";
import { useEffect } from "react";

export const AdminProfilePage = ({ groups }) => {
    const [activeMenu, setActiveMenu] = useState(1);
    const [data, setData] = useState({});
    const { subjects, teachers, cabinets, lessonTypes, academicStatus } = data;

    const getAllData = async () => {
        try {
            const [subjects, teachers, cabinets, lessonTypes, academicStatus] =
                await Promise.all([
                    getAllSubjects(),
                    getAllTeachers(),
                    getAllCabinets(),
                    getAllLessonTypes(),
                    getAllAcademicStatus()
                ]);

            const data = {
                subjects,
                teachers,
                cabinets,
                lessonTypes,
                academicStatus
            };
            setData(data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => getAllData(), []);

    return (
        <div className="profile">
            <MenuBlock activeMenu={activeMenu} setActiveMenu={setActiveMenu} />

            {activeMenu === 1 && <BotsPage />}
            {activeMenu === 2 && groups && <UserInfo groups={groups} />}
            {activeMenu === 3 && teachers &&
                <TeachersInfo prevTeachers={teachers.data} academicStatus={academicStatus} />
            }
            {activeMenu === 4 && groups && subjects &&
                <SheduleEditBlock
                    isAdmin={true}
                    groups={groups}
                    prevSubjects={subjects}
                    prevTeachers={teachers}
                    prevCabinets={cabinets}
                    prevLessonTypes={lessonTypes}
                />
            }
            {activeMenu === 5 && cabinets &&
                <CabinetsPage prevCabinets={cabinets} />
            }
            {activeMenu === 6 && subjects &&
                <SubjectsPage prevSubjects={subjects} />
            }
        </div>
    );
};
