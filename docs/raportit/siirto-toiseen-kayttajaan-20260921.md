# Kehitystyö Macin toiselle käyttäjälle: oikeuksien jako (21.9.2026)

Omistajan päätös 21.9.2026: kehitystyö siirtyy Macin toiselle
käyttäjälle. Tapa: hakemistoja EI siirretä, vaan uusi käyttäjä saa
ACL-oikeuden nykyisiin kansioihin. Kaikki polut (Raamattu, roolitus,
muisti, worktreet) pysyvät ennallaan. Codex jää vanhaan käyttäjään.

Uusi käyttäjä on `koodaus`. Vaiheet 1–2 ajetaan vanhassa
käyttäjässä (samireivinen), vaiheet 3–8 uudessa.

## 1. Vanhassa käyttäjässä: sammuta CI-ajurit

```bash
cd ~/actions-runner && ./svc.sh stop && ./svc.sh uninstall
```

```bash
cd ~/actions-runner-2 && ./svc.sh stop && ./svc.sh uninstall
```

Ajurit ovat LaunchAgentteja, jotka sammuvat joka tapauksessa kun tämä
käyttäjä kirjautuu ulos. Ne asennetaan uudelleen uudessa käyttäjässä
(vaihe 6). Sama ajurihakemisto ja rekisteröinti (SamiMacStudio2 ja
SamiMacStudio2-testit) kelpaavat, uutta rekisteröintiä GitHubiin ei
tarvita.

## 2. Vanhassa käyttäjässä: avaimet ja oikeudet

Codex avasi 21.9. klo 11.15 ACL:llä kaikille paikallisille käyttäjille
(ryhmä localaccounts) repot, kaikki Matkakirja-työpuut, Codex-
toimituskansion ja kuvatuotannon työtilan, periytyvästi, sekä kotihakemiston
läpikulun. Yhteiskansio /Users/Shared/Matkakirja-yhteinen/ sisältää linkit
näihin. Fable kopioi sinne myös Clauden muistin (claude-muisti/memory).
TEHTY, ei ajeta uudelleen.

Jäljellä vanhassa käyttäjässä (sudo kysyy salasanan):

Avaimet ovat `~/.zshrc`-tiedoston export-riveinä. Kopioi ne omaan
tiedostoon, jonka uusi käyttäjä lukee (Fable ei koske avaintiedostoihin):

```bash
grep '^export ' ~/.zshrc > ~/.matkakirja-avaimet.zsh && chmod 600 ~/.matkakirja-avaimet.zsh && sudo chmod +a "koodaus allow read,readattr,readextattr,readsecurity" ~/.matkakirja-avaimet.zsh
```

CI-ajurien hakemistot eivät ole Codexin ACL:n piirissä:

```bash
sudo chmod -R +a "koodaus allow list,add_file,search,delete,add_subdirectory,delete_child,readattr,writeattr,readextattr,writeextattr,readsecurity,file_inherit,directory_inherit" /Users/samireivinen/actions-runner /Users/samireivinen/actions-runner-2
```

Vanhat, tarpeettomat worktreet (Matkakirja-opus-2 ja scratchpadin
wt-*) voi jättää; Fable siivoaa ne uudessa käyttäjässä
`git worktree prune` -komennolla.

## 3. Uudessa käyttäjässä: shell, git, Homebrew

Lisää `~/.zshrc`-tiedostoon:

```bash
printf '%s\n' 'eval "$(/opt/homebrew/bin/brew shellenv)"' 'source /Users/samireivinen/.matkakirja-avaimet.zsh' >> ~/.zshrc && source ~/.zshrc
```

Git: tiedostot ovat toisen käyttäjän omistamia, joten git tarvitsee
luvan, ja identiteetti asetetaan samaksi kuin ennen:

```bash
git config --global --add safe.directory '*' && git config --global user.name "Sami Reivinen" && git config --global user.email "samireivinen@SamiMacStudio2.localdomain"
```

Tarkistus:

```bash
cd /Users/samireivinen/Matkakirja-fable && git status -sb | head -3 && node --version
```

## 4. Uudessa käyttäjässä: gh ja Claude

```bash
gh auth login -h github.com -p https -w && gh auth refresh -s workflow
```

Claude-työpöytäsovellus: kirjaudu tällä (kehitys)tilillä. Kopioi Fablen
muisti yhteiskansiosta uuden käyttäjän Claude-hakemistoon (projektiavain
pysyy samana, koska polku ei muutu):

```bash
mkdir -p ~/.claude/projects/-Users-samireivinen-Matkakirja-fable && cp -R /Users/Shared/Matkakirja-yhteinen/claude-muisti/memory ~/.claude/projects/-Users-samireivinen-Matkakirja-fable/
```

## 5. Uudessa käyttäjässä: Playwright ja Xcode

```bash
cd /Users/samireivinen/Matkakirja-fable && npx playwright install chromium
```

Avaa Xcode kerran ja hyväksy lisenssi (tai `sudo xcodebuild -license
accept`). Simulaattorien runtimet ovat järjestelmän yhteisiä; iPhone 18
Pro -laite luodaan tarvittaessa uudelleen (Laitetestaaja hoitaa ja pyytää
laiteluvan kortilla).

## 6. Uudessa käyttäjässä: CI-ajurit takaisin

```bash
cd /Users/samireivinen/actions-runner && ./svc.sh install && ./svc.sh start && ./svc.sh status
```

```bash
cd /Users/samireivinen/actions-runner-2 && ./svc.sh install && ./svc.sh start && ./svc.sh status
```

Tarkista GitHubissa Settings → Actions → Runners: molemmat "Idle".

## 7. Uudessa käyttäjässä: sessiot

Avaa Claude-työpöytäsovelluksen Code-välilehdellä kuusi sessiota, kukin
omassa hakemistossaan, ja nimeä ne "Rooli (malli)". Liitä kuhunkin sen
aloitusviesti (alla). Fable ensin; se lähettää muille aloitusviestit
itse, jos ne ovat jo auki (peer-viestit toimivat saman käyttäjän
sessioiden välillä).

| sessio | hakemisto | malli, effort |
|---|---|---|
| Fable (Fable 5.1) | /Users/samireivinen/Matkakirja-fable | medium |
| Julkaisija (sonnet) | /Users/samireivinen/Matkakirja-sonnet3 | medium |
| Karttaseppä (opus) | /Users/samireivinen/Matkakirja-opus2 | high |
| Pelikoodari (opus) | /Users/samireivinen/Matkakirja-opus | high |
| Sisältökirjuri (sonnet) | /Users/samireivinen/Matkakirja-nostot | high |
| Laitetestaaja (sonnet) | /Users/samireivinen/Matkakirja-sonnet | high |

Raamatunkarsija-sessiota ei avata (valmis).

### Aloitusviesti Fablelle

> Olet Fable, Matkakirjan päätoimittaja. Lue CLAUDE.md, Raamatun
> Ydinajatus-osion kohta 2 "TYÖTAPA JA SESSIOT" ja
> docs/raportit/viesti-fable-luovutus-20260921-siirto.md. Jatka siitä;
> älä palauta edellistä keskustelua. Lähetä muille roolisessioille
> aloitusviestit niiden luovutuksiin viitaten.

### Aloitusviesti muille (Fable lähettää; varalta tähän)

> Fable: olet <Rooli> (<malli>, effort <taso>). Lue CLAUDE.md, Raamatun
> Ydinajatus kohta 2 "TYÖTAPA JA SESSIOT" ja oma luovutuksesi
> docs/raportit/viesti-<rooli>-luovutus-20260921-siirto.md; jatka siitä.
> Worktree <hakemisto>, haarat <rooli>-<aihe> pohjana origin/v1973-prep.
> Viesti Fablelle vain kun erä on valmis ja pushattu, jumissa tai päätös
> tarvitaan; enintään 8 riviä.

## 8. Vanha käyttäjä

Kirjaudu ulos vanhasta käyttäjästä vasta kun vaihe 6 on tarkistettu.
Codex jää vanhaan käyttäjään; sen toimituskansio
/Users/samireivinen/Documents/Codex/ on ACL:llä uuden käyttäjän
luettavissa, joten Julkaisijan tunneittainen haku jatkuu ennallaan.
Omistaja voi kysyä Codexilta, saako sen tiedostot neutraaliin kansioon;
siihen asti polku pysyy.

## Mikä ei siirry

- Työpöytäsessioiden historia (uudet sessiot luovutuksista).
- Keychainin kirjautumiset (Claude, gh) ja Playwrightin selaimet.
- Vanhan käyttäjän LaunchAgentit (ajurit asennetaan uudelleen).
