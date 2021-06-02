<div className="shedule-block__section--weeks">
<span
    className={`shedule-block__section--weeks-item ${
        selectedWeek === 1 ? "active" : ""
    }`}
    onClick={() => setSelectedWeek(1)}
>
    1 тиждень
</span>
<span
    className={`shedule-block__section--weeks-item ${
        selectedWeek === 2 ? "active" : ""
    }`}
    onClick={() => setSelectedWeek(2)}
>
    2 тиждень
</span>
</div>