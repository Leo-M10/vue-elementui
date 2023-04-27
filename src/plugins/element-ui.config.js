import ElementUI from "element-ui";

const messages = ['success', 'warning', 'info', 'error'];


const fn = function () {
    messages.forEach(type => {
        ElementUI.Message[type] = options => {
            if (typeof options === 'string') {
                options = {
                    message: options
                };
                // 全局默认配置
                options.duration = 2000;
                options.showClose = true;
                options.center = true
            }
            options.type = type;
            return ElementUI.Message(options);
        };
    })
}
export default fn