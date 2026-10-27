# Codex → Pelikoodari: käsituettu esteenylitys molemmille Puyille

`vault_hand` on valmis tekniseen peli-/tuontikokeeseen perus- ja viittamallille. 0,96 sekunnin liike, vasen käsi tukee 0,5m:n esteeseen 0,295–0,345s. Jalat kulkevat sivukautta esteen yli, ilmaosuus0,60s. Sama ulkoinen juurikäyrä ja alku/loppuasento kuin aiemmin toimitetussa `vault_low`-liikkeessä. Ei uusia Tripo- tai kuvagenerointeja,0krediittiä.

Paketti: `/Volumes/T7 4TB/ChatGPT-Codex-active/ChatGPT/Matkakirja 2/output/juoksupeli-liikkeet-20261027/vault-hand-review-v1`. GLB:t vain T7:llä:

- `models/puyi-perus-parkour.glb`, 10010188tavua, SHA256 `cf0cbc25384ba47c56e21f46da8fdd908e99c5f3d33ad56767f48e800cd27d19`.
- `models/puyi-viitta-parkour.glb`, 10097480tavua, SHA256 `dc7b69a4f5be4528931b49c85e87a8d3ca6effd03ac1ab363bf508c2a774b533`.

Tämä on viiden leikkeen lisäpaketti (idle,run,vault_low,run_upstairs,vault_hand), **ei vanhan koko liikekirjaston korvaaja**. Edelliset neljä leikettä, luusto, koko geometria ja tekstuurit on verrattu muuttumattomiksi. Tuontitapakysymys44de2de4 on edelleen avoin: valitse uusi leike vanhaan hahmoon tai pyydä erillinen animaatiotoimitus.

923asennon960Hz tarkistus: luuankkurin poikkeama alle0,14mm; jatkuvuus ja lattia läpäisty. 462asennon koko kolmioverkon esteleikkaustestissä0osumaa molemmilla, 2mm:n kontaktitoleranssi. Pelkkä luuankkuri ei riittänyt: lisäksi tarkastin todellisen painotetun kämmenpinnan ja hihansuun lähikuvat. Kontaktijaksolla perusmallin alin kämmenpinta on noin1,1–1,5mm pinnan sisällä (sovitun2mm toleranssin sisällä); viittamallin vastaava etäisyys pinnan yläpuolella1,14–1,73mm. Hahmon vanha kainalo-/kangaskorjaus ja pelin siirtymät pysyvät erillisinä avoimina kohtina.

Lähikuvissa käden ulkopuoliset leikkausreunat ovat tarkastelun rajauksesta, eivät koko verkon repeämiä. Koko liike edestä/sivulta/takaa yläviistosta ja kämmenen lähikuvat `qa/`-kansiossa. `CONTROLLER-CONTRACT.json` + `ROOT-SAMPLES.csv`: este X[-1,8;1,8],Y[0;0,5],Z[1,9;2,4], root loppuun(0;0;4,8)m. Älä lisää tähän automaattista land_soft-siirtymää tai normaalia etenemää juurikäyrän lisäksi. Ei runtime-IK-vaatimusta.

Pyydän tuonti- ja pelikokeen kuittausta. Paikallinen QA ei ole peli-integraatio eikä omistajan hyväksyntä. Jatkan pudottautumista ja puomiliikkeitä; eunukkien lähdekasvokorjauksen vaihtoehto odottaa erillistä päätöstä.
