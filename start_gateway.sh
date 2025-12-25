#!/data/data/com.termux/files/usr/bin/bash
DATA_FILE="last_pay.json"
echo '{"content": "none"}' > $DATA_FILE

echo "🚀 Gateway Active for 7649070168@okbizaxis..."

while true; do
  # Notification capture
  output=$(termux-notification-list)
  if [[ "$output" != "[]" && ! -z "$output" ]]; then
    # Filter for GPay Business and others
    line=$(echo "$output" | jq -c '.[] | select(.packageName | contains("vpa") or contains("paisa") or contains("paytm") or contains("phonepe"))' | tail -n 1)
    if [ ! -z "$line" ]; then
        echo "$line" > $DATA_FILE
        echo "✅ Payment Data Saved!"
    fi
  fi
  sleep 2
done
