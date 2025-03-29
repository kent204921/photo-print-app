const { createClient } = require('@supabase/supabase-js');

// 初始化 Supabase 客户端
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

exports.handler = async (event) => {
  // 解析 FormData
  const formData = new FormData();
  for (const [key, value] of Object.entries(event.body)) {
    formData.append(key, value);
  }
  const user = formData.get("user");
  const photo = formData.get("photo");

  // 验证用户
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', user)
    .single();
  if (error || !data) {
    return {
      statusCode: 404,
      body: JSON.stringify({ success: false, message: "用户不存在" })
    };
  }

  // 检查使用次数
  if (data.usage_count <= 0) {
    return {
      statusCode: 403,
      body: JSON.stringify({ success: false, message: "使用次数不足" })
    };
  }

  // 模拟打印（未来替换为云盒或云端打印机 API）
  console.log(`打印照片：${photo.name}, 大小：${photo.size}`);
  // 假设打印成功，数据不保存，直接丢弃

  // 扣除使用次数
  const newUsageCount = data.usage_count - 1;
  const { error: updateError } = await supabase
    .from('users')
    .update({ usage_count: newUsageCount })
    .eq('email', user);
  if (updateError) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, message: "更新使用次数失败：" + updateError.message })
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true, usageCount: newUsageCount })
  };
};