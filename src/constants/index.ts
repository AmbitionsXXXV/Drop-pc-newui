export const RE__MOBILE = /^1\d{10}$/u // 中国大陆手机号

export const RE__PASSWD_INTENTION =
  /^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/u // 最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符

export const AUTH_TOKEN = "auth_token"
