(async () => {
    const tokensPath = 'assets/Race%20tokens/';
    const racesFiles = await FilePicker.browse("user", tokensPath);
    const racesDirs = racesFiles.dirs;
    const races = racesDirs.map(path => path.split('/').pop());
    const raceOptions = races.map((v, k) => `<option value="${k}">${v}</option>`).join('');

    const commonRaces = ['DWARF', 'ELF', 'HALFLING', 'HUMAN']
    const uncommonRaces = ['DRAGONBORN', 'GNOME', 'HALF-ORC', 'TIEFLING', ...commonRaces];

    const chooseImage = async (raceValue, genderValue) => {
        let race = "";
        if (raceValue >= 0)
            race = races[raceValue];
        else {
            const from = raceValue == "-2" ? commonRaces : raceValue == "-3" ? uncommonRaces : races;
            race = from[Math.floor(Math.random() * from.length)];
        }
        if (genderValue === 0) 
            genderValue = Math.random() > 0.5 ? 1 : 2;
        const gender = genderValue == 1 ? "Female" : "Male";
        const imagesPath = `${tokensPath}${race}/${gender}`;
        try {
            const content = await FilePicker.browse("user", imagesPath);
            return content.files[Math.floor(Math.random() * content.files.length)];
        } catch (_) {
            const content = await FilePicker.browse("user", `${tokensPath}${race}`);
            return content.files[Math.floor(Math.random() * content.files.length)];
        }
    };

    const content = `
    <form id="random-npc-form">
        <div class="form-group">
            <label>Race</label>
            <select name="race">
                <option value="-2">Common</option>
                <option value="-3">Uncommon</option>
                <option value="-1">Any</option>
                ${raceOptions}
            </select>
        </div>
        <div class="form-group">
            <label>Gender</label>
            <select name="gender">
                <option value="0">Any</option>
                <option value="1">Pretty</option>
                <option value="2">Ugly</option>
            </select>
        </div>
        <div class="form-group">
        <input type='button' name='randomize' value="Randomize" />
        </div>
    </form>`;

    new Dialog({
        title: 'Random NPC',
        content,
        buttons: {},
        render: html => {
            const $form = html.find("#random-npc-form");
            $form.find("input[name='randomize']").on('click', async () => {
                const raceValue = $form.find('[name="race"]').val();
                const genderValue = $form.find('[name="gender"]').val();
                const updates = [];
                await Promise.all(canvas.tokens.controlled.map(async (token) => {
                    const newImage = await chooseImage(raceValue, genderValue);
                    updates.push({ _id: token.id, img: newImage })
                }));
                canvas.scene.updateEmbeddedDocuments('Token', updates);
            });
        }
    }).render(true);    
})();