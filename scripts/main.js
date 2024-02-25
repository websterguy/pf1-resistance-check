Hooks.once('init', () => {
    libWrapper.register('pf1-resistance-check', 'pf1.documents.actor.ActorPF.applyDamage', function (wrapped, ...args) {
        const relevantKeys = ['dr', 'eres', 'cres', 'di', 'dv', 'ci'];
        const emptyIWR = {
            'dr': {
                'value': [],
                'custom': ''
            },
            'eres': {
                'value': [],
                'custom': ''
            },
            'cres': '',
            'di': {
                'value': [],
                'custom': ''
            },
            'dv': {
                'value': [],
                'custom': ''
            },
            'ci': {
                'value': [],
                'custom': ''
            }
        };
        let forceDialog = false;

        if (event.shiftKey && !event.ctrlKey) {
            forceDialog = false;
        }
        else if (event.shiftKey && event.ctrlKey) {
            forceDialog = false;
        }
        else {
            for (const token of canvas.tokens.controlled) {
                if (Object.keys(diffObject(emptyIWR, token.actor?.system.traits)).some(o => relevantKeys.includes(o))) {
                    forceDialog = true;
                    break;
                }
            }
        }

        if (forceDialog) {
            args[1]['forceDialog'] = true;
        }
        let result = wrapped(...args);
        return result;
    });
});