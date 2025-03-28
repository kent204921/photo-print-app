exports.handler = async (event) => {
  const { action, email, password } = JSON.parse(event.body);

  // 模拟用户数据存储（实际需用外部 KV 或数据库）
  const users = {
    "test@example.com": { password: "123456", usageCount: 5, approved: true }
  };

  if (action === "login") {
    if (users[email] && users[email].password === password) {
      if (users[email].approved) {
        return {
          statusCode: 200,
          body: JSON.stringify({ success: true, usageCount: users[email].usageCount })
        };
      } else {
        return {
          statusCode: 403,
          body: JSON.stringify({ success: false, message: "账户未通过B审核" })
        };
      }
    } else {
      return {
        statusCode: 401,
        body: JSON.stringify({ success: false, message: "邮箱或密码错误" })
      };
    }
  }

  if (action === "register") {
    if (users[email]) {
      return {
        statusCode: 400,
        body: JSON.stringify({ success: false, message: "邮箱已存在" })
      };
    }
    users[email] = { password, usageCount: 0, approved: false };
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };
  }

  return {
    statusCode: 400,
    body: JSON.stringify({ success: false, message: "无效操作" })
  };
};