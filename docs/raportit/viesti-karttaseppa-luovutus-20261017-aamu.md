# Karttasepän luovutus 17.10.2026 klo 08.00 (Postivahti: kova raja 41 %)

Linjaukset: Raamattu + muisti `karttaseppa-tila-*`. VIESTIT aina `send_message` session id:llä tiedostosta
`/Users/Shared/Claude/osoitekirja.md`, PT:lle ≤ 3 riviä. Edellinen luovutus: `viesti-karttaseppa-luovutus-20261017-yo2.md` (3f32df704).

## Aloitusviesti uudelle sessiolle

> Olet Karttaseppä (Opus, high). Lue CLAUDE.md ja `git show <SHA>:docs/raportit/viesti-karttaseppa-luovutus-20261017-aamu.md`
> KOKONAAN (haara karttaseppa-tyo-20260922). Viestit send_messagella id:llä (osoitekirja.md), PT:lle ≤ 3 riviä. JATKA KOHDASTA 1.

Käännökset ja simut VAIN Julkaisijan jonon kautta (KÄÄNNÖS / SIMU NYT); ilmoita SIMU VAPAA. Junaan vain PT:n/KK:n ok:lla.
Proto-worktree: /Users/Shared/Claude/wt/proto-karttaseppa-iss-reitti-198 (nyt haarassa karttaseppa/kiina-vaestopinta-199).
Päärepon sparse-worktree: /Users/Shared/Claude/wt/karttaseppa-kiinan-kerrokset (nyt haarassa karttaseppa-kiina-vaestopinta).

## 1. ODOTTAA PT:N SIGNAALIA: väestöpintavideo, Punaiset kalliot 208 (omistaja 07.36/07.37 "Kyllä, kokeilu videona")

- PT 08.0x: **kun PT ilmoittaa, että NS on lukinnut junan 199 → pyydä JU:lta heti KÄÄNNÖS + iPad-simu.** Video PT:lle (hän vie KK:lle).
- Haara proto `karttaseppa/kiina-vaestopinta-199` **941bb139b** (juna-198 + väestöpinta e1f1ad37e + aineistopäivitys 2ed6677c2 +
  PK:n armeijat 45927501f yhdistetty; tarkista.sh 0, Kiina-testit 21/21). Jos junan 199 lukitus tuo uusia committeja, mergeä
  natiiviseppa/juna-199 (tai lukituksen haara) ensin ja aja tarkista.sh.
- KÄÄNNÖS → `PROTO_APP_KOPIO=/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/kiina-vaestopinta-208-app`; kirjoita `kaannos.out`
  (`KÄÄNNETTY <sha> karttaseppa/kiina-vaestopinta-199`), jos JU ei kirjoita. Ajo: `zsh /Users/Shared/Claude/proto-3d/_tyo/karttaseppa/kiina-vaestopinta-208/ajo-vaestopinta-208.zsh`
  (iPad 00CF62C2-…, skenaario sk-vaestopinta-208.txt: V0–V5 + 30 s video). Kuormassa ajo voi keskeytyä mykistystarkistukseen → aja uudelleen.
- Koodi: Ydin `Linssit/Ydin/Kiina/KiinaVaestopinta.cs` (aineisto, näytteet), Unity `Linssit/Unity/KiinaVaestopintaKerros.cs`
  (240×220 verkko pallolla, väri = omistaja, korkeus = KiinaArmeijat.Kentta × 2,5 km/hlö·km⁻², huiput armeijan värillä),
  `Resources/Varjostimet/KiinaVaestopinta.shader`, QA `linssi kiina vaestopinta [208] | <t> | ajo <s> | kerroin <m> | kamera | pois`
  (LinssiOhjain). Aineisto `Resources/Kiina/Vaestopinta/` (tiheys-208.bytes = mainin vaestopinta-208.bytes, cmp).
- Data: päärepon haara `karttaseppa-kiina-vaestopinta` **105040e97** (EI PR:ää vielä; avaa PR kokeilun hyväksynnän jälkeen):
  `tools/kiinan-dynastiat/vaestopinta.py` (+ `_data.py`, `_kuva.py`), `data/linssit/kiinan-dynastiat/vaestopinta/`,
  `MUOTO-VAESTOPINTA.md`. Tiheys = OMA ARVIO (34 milj.; ETOPO1 + NE-joet + alueosuudet). Armeijat SK:n vaihteluväleistä
  (`docs/kohtaukset/kiinan-dynastiat/punaiset-kalliot-luvut.md` 96692a25f): Cao Cao 150–240 k (piirto 200 k), Sun–Liu 40–50 k,
  tappiot vain visuaalisia (ei lukua).
- HYDE: 3.2.1 CC0 (DANS) / 3.3 CC BY 4.0. Skriptihaku EI sallittu (DANS robots.txt Disallow /, Yoda Anubis), selainpaneeli ei lataa.
  PT: käsilatausta EI pyydetä nyt; jos omistaja hyväksyy kokeilun, PT kysyy toimikortilla. Ei estojen kiertämistä.
- Esikatselu: `/Users/Shared/Claude/proto-3d/_tyo/karttaseppa/kiina-vaestopinta-208/esikatselu-208.png`.

## 2. ODOTTAA KK:N VASTAUSTA (PT: etusijalla, kun tulee)

- **ISS-pallon himmennys** (omistaja 06.5x: "lentorata himmeämpi, ruskea huppu läpinäkyvä"): proto `karttaseppa/iss-himmea-199`
  460580815 (reitti 0,5, verho 0,62 → 0,28; QA astro pallo himmea 0|1). Kuvapari `_valmiit/iss-himmea-199-20261017/lahikuva-nyt-uusi.png`.
  Ok:lla NS:lle junaan 199. Jos huppu pitää vielä läpinäkyvämmäksi: `Sijaintipallo.VerhoVoima`.
- **Skannerin korkokuva + viivat** (omistaja 00.53): proto `karttaseppa/skanneri-199` f18135ce7 (sis. NUI viivat 5c2cb709b ja
  himmennyksen; QA `ui linssi skanneri vanha <tunnus>`). Kuvat `_valmiit/skanneri-vanha-uusi-199-20261017/kuva-arkki.png` + odessa.mp4.
  HUOM `IssSkanneri.ViivatKaytossa` on yhä false → hyväksynnän jälkeen NUI kääntää true:ksi (tai KS NUI:n luvalla).

## 3. Valmiit tällä vuorolla

| Erä | Toimitus |
|---|---|
| Kiinan kerrokset (241) | PR #4764 mergetty 9819ad795 |
| Taistelupaikat alueina (Punainen kallio 12 km, Fei-joki 15 km) | PR #4769 mergetty 8e856aa88 |
| ISS-reitti + rajat + telinelaatikko pois | iPhone-todistus, PT/KK hyväksyi, junassa 198 (NS 15bf1ee6d) |
| Tuotantopohja uusi-linssi, KS-osuus | PR #4771 haaraan 9f44d6015 |
| Käynnistyksen 27 s hiljaisuus | selvitys `docs/raportit/karttaseppa-kaynnistyksen-hiljaisuus-20261017.md` (072af787c): pääsäikeen synkroninen tiedosto-I/O täydellä T7:llä |
| Codex aloituskartan vihjeet #313/#314 | kuitattu postiin 9dca84253 (claude/postilaatikko) |

## Muistiinpanot

- Proto-worktreessa haaroja: karttaseppa/skanneri-199, iss-himmea-199, kiina-vaestopinta-199 (kaikki natiivi-backupissa).
- T7 100 % täynnä (20 Gi); simuajojen hiljaisuus-PUUTTEET kuormassa ovat levy-I/O:ta (selvitys yllä).
- zsh-ansa: `"$C:refs/…"` tulkitaan :r-muokkaimeksi → käytä `"${C}:refs/…"`.
