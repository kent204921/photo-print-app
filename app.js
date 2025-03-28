// 获取 DOM 元素
const fileInput = document.getElementById("fileInput");
const uploadButton = document.getElementById("uploadButton");
const previewImage = document.getElementById("previewImage");
const log = document.getElementById("log");

// 上传按钮事件监听
uploadButton.addEventListener("click", async () => {
  const file = fileInput.files[0];
  if (!file) {
    log.innerHTML = "请先选择一张照片！";
    return;
  }

  // 显示预览
  const reader = new FileReader();
  reader.onload = () => {
    previewImage.src = reader.result;
    previewImage.style.display = "block";
  };
  reader.readAsDataURL(file);

  log.innerHTML = "正在上传...";

  // 坚果云 API 配置
  const url = "https://dav.jianguoyun.com/dav/photo-print-app/"; // 应用名称为 photo-print-app
  const username = "w30405376@gmail.com"; // 你的坚果云账户
  const password = "arn8epgxibcp2akq"; // 你的坚果云密码

  try {
    const response = await fetch(url + file.name, {
      method: "PUT",
      headers: {
        "Authorization": "Basic " + btoa(username + ":" + password)
      },
      body: file,
    });

    if (response.ok) {
      log.innerHTML = "上传成功！";
    } else {
      log.innerHTML = "上传失败：" + response.statusText;
    }
  } catch (error) {
    log.innerHTML = "上传出错：" + error.message;
  }
});
