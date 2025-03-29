const { createClient } = require('@supabase/supabase-js');

// 初始化 Supabase 客户端
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

exports.handler = async (event) => {
  // 解析请求体
  const { action, email, password } = JSON.parse(event.body);

  // 登录逻辑
  if (action === "login") {
    // 使用 Supabase Auth 登录
    const { user, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error || !user) {
      return {
        statusCode: 401,
        body: JSON.stringify({ success: false, message: "邮箱或密码错误" })
      };
    }

    // 从 users 表获取用户数据
    const { data, error: fetchError } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();
    if (fetchError || !data) {
      return {
        statusCode: 404,
        body: JSON.stringify({ success: false, message: "用户不存在" })
      };
    }

    // 检查是否通过 B 审核
    if (!data.approved) {
      return {
        statusCode: 403,
        body: JSON.stringify({ success: false, message: "账户未通过B审核" })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, usageCount: data.usage_count })
    };
  }

  // 注册逻辑
  if (action === "register") {
    // 使用 Supabase Auth 注册
    const { user, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      return {
        statusCode: 400,
        body: JSON.stringify({ success: false, message: error.message })
      };
    }

    // 插入用户数据到 users 表
    const { error: insertError } = await supabase
      .from('users')
      .insert({ email, password, usage_count: 0, approved: false });
    if (insertError) {
      return {
        statusCode: 500,
        body: JSON.stringify({ success: false, message: "注册失败：" + insertError.message })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };
  }

  // 无效操作
  return {
    statusCode: 400,
    body: JSON.stringify({ success: false, message: "无效操作" })
  };
};