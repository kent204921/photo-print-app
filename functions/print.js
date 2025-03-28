exports.handler = async (event) => {
  const formData = await event.body;
  const user = formData.get("user");
  const photo = formData.get("photo");

  // 模拟用户数据（实际需用外部 KV）
  const users = {
    "test@example.com": { usageCount: 5 }
  };

  if (!users[user]) {
    return {
      statusCode: 404,
      body: JSON.stringify({ success: false, message: "用户不存在" })
    };
  }

  if (users[user].usageCount <= 0) {
    return {
      statusCode: 403,
      body: JSON.stringify({ success: false, message: "使用次数不足" })
    };
  }

  // 模拟打印（未来替换为云盒或云端打印机 API）
  console.log(`打印照片：${photo.name}, 大小：${photo.size}`);
  // 假设打印成功，数据不保存，直接丢弃

  // 扣除使用次数
  users[user].usageCount -= 1;

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true, usageCount: users[user].usageCount })
  };
};