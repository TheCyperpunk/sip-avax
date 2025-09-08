;; Define constants and errors
(define-constant contract-owner tx-sender)
(define-constant ERR-NOT-AUTHORIZED (err u1))
(define-constant ERR-INVALID-AMOUNT (err u2))
(define-constant ERR-NO-ACTIVE-PLAN (err u3))

;; Define data maps and variables
(define-data-var next-plan-id uint u0)

(define-map sip-plans
    { plan-id: uint }
    {
        owner: principal,
        total-amount: uint,
        amount-per-interval: uint,
        frequency: uint,
        next-execution: uint,
        maturity: uint,
        dest-address: principal,
        executed-amount: uint,
        active: bool
    }
)

;; Public functions
(define-public (create-plan 
    (total-amount uint)
    (amount-per-interval uint)
    (frequency uint)
    (maturity uint)
    (dest-address principal))
    (let
        ((plan-id (var-get next-plan-id)))
        (begin
            ;; Validation checks
            (asserts! (>= total-amount u100000000) ERR-INVALID-AMOUNT)
            (try! (stx-transfer? total-amount tx-sender (as-contract tx-sender)))
            
            ;; Create plan
            (map-set sip-plans
                { plan-id: plan-id }
                {
                    owner: tx-sender,
                    total-amount: total-amount,
                    amount-per-interval: amount-per-interval,
                    frequency: frequency,
                    next-execution: (+ block-height frequency),
                    maturity: maturity,
                    dest-address: dest-address,
                    executed-amount: u0,
                    active: true
                }
            )
            
            (var-set next-plan-id (+ plan-id u1))
            (ok plan-id)
        )
    )
)

;; Read-only functions
(define-read-only (get-plan (plan-id uint))
    (map-get? sip-plans {plan-id: plan-id})
)