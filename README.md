# 眠目音茴

个人静态网页，使用 GitHub Pages 托管，无需安装依赖或构建。

## 发布

在仓库 Settings → Pages 中选择 Deploy from a branch，分支 main，目录 / (root)，保存后等待部署完成。

页面资源：index.html、style.css、script.js、data.js、downloads.js、particle.js、congyu.png、favicon.jpg 和 .nojekyll。

## 下载文件

本地 downloads 文件夹中的大文件不提交到 Git 仓库。将文件上传为 GitHub Release 附件后，把 downloads.js 中对应的 url 改为附件的下载地址。直接运行 update-downloads.cmd 会恢复本地相对路径，发布前需再次检查远程下载链接。

## 修改内容

编辑 data.js 修改网页收藏；编辑 downloads.js 修改下载列表。提交修改后 GitHub Pages 会重新发布。
