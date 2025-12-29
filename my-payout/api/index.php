

cat <<'EOF' > api/index.php
<?php
header('Content-Type: application/json');
$mobile = $_POST['mobile'] ?? '';
$otp = $_POST['otp'] ?? '';

if ($mobile) {
    echo json_encode(["status" => "success", "message" => "Vercel PHP Active", "mobile" => $mobile]);
} else {
    echo json_encode(["status" => "error", "message" => "Server is Live. Send mobile number via POST."]);
}
?>
EOF

