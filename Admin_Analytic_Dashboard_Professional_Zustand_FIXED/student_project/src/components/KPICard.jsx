function KPICard({
  title,
  value,
  change,
  icon,
  positive = true
}) {

  return (

    <div className="kpi-card">

      <div className="kpi-top">

        <div>
          <p>{title}</p>
          <h2>{value}</h2>
        </div>

        <div className="kpi-icon">
          {icon}
        </div>

      </div>


      <div
        className={
          positive
            ? "trend positive"
            : "trend negative"
        }
      >

        {positive ? "↑" : "↓"}

        {" "}

        {change}

        <span> vs last month</span>

      </div>

    </div>

  );
}

export default KPICard;