export default function continueMessage(value, data, callback) {
    if (!value) {
        return callback({text: 'Введи слово'});
    }

    return callback({text: `${value} какой-то статический текст`});
}