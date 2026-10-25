function UpgradeModal({
  currentPlan,
  billing,
  setBilling,
  onUpgrade,
  onClose,
}) {
  const plans = [
    {
      id: "free",
      name: "Free",
      description: "For getting started",
      monthly: 0,
      yearly: 0,
      popular: false,
      features: [
        "Basic Dashboard",
        "5 Users",
        "Basic Analytics",
        "Standard Support",
      ],
    },
    {
      id: "pro",
      name: "Pro",
      description: "For growing businesses",
      monthly: 999,
      yearly: 9990,
      popular: true,
      features: [
        "Everything in Free",
        "50 Users",
        "Advanced Analytics",
        "Export Reports",
        "Priority Support",
      ],
    },
    {
      id: "business",
      name: "Business",
      description: "For larger teams",
      monthly: 2499,
      yearly: 24990,
      popular: false,
      features: [
        "Everything in Pro",
        "Unlimited Users",
        "Custom Reports",
        "Team Management",
        "Premium Support",
      ],
    },
  ];

  return (
    <div
      className="upgrade-overlay"
      onClick={onClose}
    >
      <div
        className="upgrade-modal"
        onClick={(event) =>
          event.stopPropagation()
        }
      >
        {/* Header */}
        <div className="upgrade-modal-header">
          <div>
            <span className="upgrade-eyebrow">
              ADMINPRO PLANS
            </span>

            <h2>Choose the right plan</h2>

            <p>
              Unlock powerful analytics and
              advanced features for your business.
            </p>
          </div>

          <button
            className="upgrade-close"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        {/* Billing Toggle */}
        <div className="billing-switch">
          <button
            className={
              billing === "monthly"
                ? "active"
                : ""
            }
            onClick={() =>
              setBilling("monthly")
            }
          >
            Monthly
          </button>

          <button
            className={
              billing === "yearly"
                ? "active"
                : ""
            }
            onClick={() =>
              setBilling("yearly")
            }
          >
            Yearly
            <span>Save 17%</span>
          </button>
        </div>

        {/* Plans */}
        <div className="upgrade-plans">
          {plans.map((plan) => {
            const price =
              billing === "monthly"
                ? plan.monthly
                : plan.yearly;

            const isCurrent =
              currentPlan === plan.id;

            return (
              <div
                key={plan.id}
                className={
                  plan.popular
                    ? "upgrade-plan popular"
                    : "upgrade-plan"
                }
              >
                {plan.popular && (
                  <div className="popular-badge">
                    MOST POPULAR
                  </div>
                )}

                <div className="plan-icon">
                  {plan.id === "free"
                    ? "○"
                    : plan.id === "pro"
                      ? "✦"
                      : "◆"}
                </div>

                <h3>{plan.name}</h3>

                <p className="plan-description">
                  {plan.description}
                </p>

                <div className="plan-price">
                  <strong>
                    ₹{price.toLocaleString("en-IN")}
                  </strong>

                  <span>
                    /
                    {billing === "monthly"
                      ? "month"
                      : "year"}
                  </span>
                </div>

                <div className="plan-divider"></div>

                <ul>
                  {plan.features.map(
                    (feature) => (
                      <li key={feature}>
                        <span>✓</span>
                        {feature}
                      </li>
                    )
                  )}
                </ul>

                <button
                  className={
                    isCurrent
                      ? "plan-button current"
                      : plan.popular
                        ? "plan-button primary"
                        : "plan-button"
                  }
                  disabled={isCurrent}
                  onClick={() =>
                    onUpgrade(plan.id)
                  }
                >
                  {isCurrent
                    ? "Current Plan"
                    : plan.id === "free"
                      ? "Downgrade"
                      : `Upgrade to ${plan.name}`}
                </button>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="upgrade-modal-footer">
          <span>🔒 Secure billing</span>
          <span>•</span>
          <span>Cancel anytime</span>
          <span>•</span>
          <span>30-day money-back guarantee</span>
        </div>
      </div>
    </div>
  );
}

export default UpgradeModal;