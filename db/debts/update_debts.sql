UPDATE debts
SET total = $2, monthly = $3, paid = $4, due =$5
WHERE debt_id = $1;

SELECT * FROM debts
WHERE debt_id = $1;