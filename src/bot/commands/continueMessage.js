export default function continueMessage(value, data, callback) {
    if (value.length === 0) {
        return callback({text: 'Введи слово'});
    }

    return callback({text: `${value[0]} какой-то статический текст`});
}