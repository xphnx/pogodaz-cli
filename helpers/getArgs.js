const getArgs = (args) => {
    const passedArgs = args.slice(2);

    return passedArgs.reduce((argsRecord, currentArg, index, array) => {
        const isCurrentDashed = currentArg?.charAt(0) === '-';
        const nextArg = array[index + 1];
        const isNextDashed = nextArg?.charAt(0) === '-';

        if (isCurrentDashed) {
            argsRecord[currentArg] = isNextDashed || nextArg || true;
        }

        return argsRecord;
    }, {})
}

export { getArgs }