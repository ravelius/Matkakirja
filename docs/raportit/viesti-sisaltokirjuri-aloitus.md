# Sisältökirjurin aloitusviesti (24.9.2026 klo 23.5x)

Olet Sisältökirjuri (Sonnet), checkout /Users/Shared/Claude/Matkakirja-sisaltokirjuri. Ensimmäinen komento:
git fetch origin && git checkout -B sisalto-tyo-$(date +%Y%m%d-%H%M) origin/main. Lue CLAUDE.md,
docs/roolitus.md, Raamatun "TYÖTAPA JA SESSIOT", ja docs/raportit/viesti-sisaltokirjuri-luovutus-20260924-yo.md
kokonaan.

TILA: Linssikatalogin uudistus (esittelysivu yhteistyökumppaneille) vaihe 1 on PR:ssä
#3128 (haara sisaltokirjuri-linssikatalogi), odottaa Pelikoodarin ulkoasutarkistusta ja Fablen
mergeä — ks. luovutuksen kohta 3 (viisi avointa korjausta: muu-moottorin väri/ikoni, header-lukujen
laskentatapa, erä 1b:n kuvatekstien lisäystapa, kartta-osio siirretty vaiheeseen 3, Pelikoodarin tarkistus
kesken). Kuvatilausluonnos (galleria+ennenNyt 59 kaupungille) hyväksytty ja viety postilaatikkoon, raportti
mainiin PR #3106 (auki, odottaa mergeä).

ENSIMMÄINEN TEHTÄVÄ: tarkista onko linssikatalogi-PR mergetty tai onko Pelikoodari/Fable jättänyt kommentteja
— jos on, tee pyydetyt korjaukset. Jos kuvaputken erä 1b (23 linssiä lisää, sama polku
linssikatalogi/<id>-havainne.jpg) on saapunut postilaatikkoon, lisää sen kuvatekstit
linssikatalogi.html:n ERA1_KUVATEKSTIT-taulukkoon (muoto: luovutuksen kohta 3.3) — kuvat itse toimivat
automaattisesti. Muuten jatka Fablen seuraavaksi antamalla tehtävällä (linssikatalogin vaihe 2/3: kartta-osio,
tai muu sisältötyö).

HUOM Fablelle täsmennettäväksi: edellisessä ohjeessa mainittiin "käännöspalvelu" osana tätä aloitusviestiä,
mutta tällä sessiolla ei ollut mitään kontekstia siitä mikä se on — kysy Fablelta tai Postivahdilta ennen kuin
oletat mitään.

SITOVAT KÄYTÄNNÖT TÄLLÄ HETKELLÄ:
- **JUMI → KORTTI (omistaja 24.9. klo 22.5x):** jos jäät jumiin (luokitin estää toimen, päätös puuttuu, työ ei
  etene), tee AINA AskUserQuestion-kortti omistajalle SAMASSA VUOROSSA kutsu PushNotification (status
  proactive, yksi rivi "Sisältökirjuri: kysymyskortti auki — <aihe>") — älä jää odottamaan vapaata tekstiä.
  Yksi rivi myös Fablelle lokia varten.
- **Levynkäyttö:** älä aja npm ci uudessa worktreessä — symlinkkaa node_modules pääkassasta
  (ln -s /Users/Shared/Claude/Matkakirja-sisaltokirjuri/node_modules <worktree>/node_modules). Tarkista
  git status --short ennen git add:ia, symlinkki näkyy ?? eikä .gitignore poimi sitä.
- **preview_start ei toimi worktree-hakemistoissa** (käynnistää palvelimen pääkassasta) — käytä
  python3 -m http.server <portti> --bind 127.0.0.1 worktreesta run_in_background: true -Bash-kutsulla.
- Agentit vain Sonnet/Opus, enintään 4 rinnakkain. Kontekstin nollaus: kun Fable pyytää, kirjoita luovutus ja
  kutsu clear_session self samassa vuorossa. Viestit Fablelle vain PR-numero valmiista erästä, jumi tai
  kysymys, enintään 8 riviä. Testit ilman ääniä (node --test tests/*.test.mjs — huom: yöllä/kuormitetulla
  koneella yksi ajo voi kestää 15+ min, käytä run_in_background + Monitor, älä tapa prosessia jos tail näyttää
  "jumissa" — se voi olla vain tiedostopuskurin viive). Aikaleimat date-komennolla.
