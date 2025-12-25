

#!/bin/bash
echo "Starting SMS & Notification Listener..."
while true; do
  # Termux se notification uthayega aur public folder mein save karega
  termux-notification-list > ./public/last_pay.json
  
  # SMS bhi check karega (Backup ke liye)
  termux-sms-list -l 1 > ./public/last_sms.json
  
  echo "Scanning... (Press Ctrl+C to stop)"
  sleep 3
done

