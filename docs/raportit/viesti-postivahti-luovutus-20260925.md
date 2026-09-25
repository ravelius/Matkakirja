# Postivahdin luovutus 25.9.2026 klo 12:18

Omistaja pysäyttää kaikki sessiot tilinvaihtoa varten. Ei clear_session-kutsua — tämä sessio pysähtyy tähän, seuraava Postivahti-sessio jatkaa aloitusviestistä.

## Tehtävän kuvaus

Postivahti on tausta-agentti, joka kiertää n. 10 min välein (ScheduleWakeup) ja:
- seuraa kaikkien roolisessioiden (Fable + 9 roolia) kontekstiprosenttia (`get_usage`), ilmoittaa Fablelle vain vahvistetuista 70%/85% ylityksistä
- seuraa 5h- ja viikkokiintiötä
- seuraa levytilaa (raja 35 Gt), wt/-worktree-määrää, sivutusta (`vm.swapusage`)
- tarkistaa `claude/postilaatikko`-mailboxin, `codex/pulu-orvot-peli-20260923`-haaran ja `~/Documents/Codex/`-kansion Codex-aktiviteetin varalta
- ajaa `tools/tarkista-tyotilat.sh` ja ilmoittaa poikkeamat
- tarkistaa `/Users/Shared/Claude/proto-3d/lokit/varmuuskopio-VIKA.txt` (uudet rivit = hylätty push) ja käännösjunan lokin (`kaannospalvelu/juna.log`, viimeisin onnistunut asennus alle 2h)
- päivittää `docs/raportit/tilataulu.md` joka kierroksella ja pushaa sen `postivahti`-haaraan
- relevoi Fablen/Julkaisijan pyyntöjä muille rooleille (esim. simulaattorien sammutuspyynnöt)

## Tila luovutushetkellä (12:18 EEST)

- **Kone käynnistyi uudelleen ~11:3x** (näyttö ei herännyt). Kaikki sessiot nollautuivat/käynnistyivät uudelleen sen myötä.
- **Sivutus ratkennut kokonaan:** vm.swapusage 0 Gt (oli huipussaan 22,8 Gt ennen reboottia).
- **Simulaattorit:** 2 boottina (natiiviseppa-iPhone, iPhone 17) — hyvin alle Fablen asettaman 4:n rajan.
- **Levy:** 196–200 Gt vapaana (raja 35 Gt, hyvä marginaali).
- **wt/-worktreet:** 35 kpl.
- **5h-kiintiö:** 14%. **Viikkokiintiö (kaikki mallit): 97%** — HUOM, hyvin lähellä 100%, ei vielä sovittua hälytysrajaa. **Viikkokiintiö (Fable): 53%.** Nollautuu 2026-09-28 klo 01:00.
- **varmuuskopio-VIKA.txt:** tyhjä, ei hylättyjä pusheja.
- **Käännösjuna:** kunnossa, viimeisin onnistunut asennus 11:23 (juna/b13).
- **launchd-agentit** (fi.matkakirja.juna, juna-vahti, siivous, app.matkakirja.natiivi-bundle): kaikki ladattu ja toiminnassa rebootin jälkeen.
- **Karttaseppä ylitti 70%** konteksti ennen tilinvaihtoa (ilmoitettu Fablelle) — todennäköisesti nollautuu tilinvaihdon myötä muiden tapaan.
- **coreaudiod-huoltokomento** (`sudo killall coreaudiod`, käytössä >200% CPU yli 2 min) on sallittu `.claude/settings.json`:ssa (PR #3142 mainissa) — käytettävissä ilman luokitinestoa.
- **Postilaatikko:** viimeisin commit `7755d9c5a` "Posti: kuittaa kahden kaupungin galleriakytkentä PR:ssä" — muuttumaton usealla kierroksella.
- **codex/pulu-orvot-peli-20260923** ja **~/Documents/Codex/**: edelleen tyhjiä koko session ajan.

## Voimassa olevat säännöt (kertaus seuraavalle Postivahdille)

1. **70%/85% konteksti** per rooli → ilmoita Fablelle vain vahvistetusta ylityksestä (lue `percentUsed` tarkasti, älä pyöristä).
2. **5h-kiintiö 95%/98%**, tauko vasta 98%:ssa.
3. **Levy 35 Gt** -raja.
4. **wt/ max 3 erä-worktreetä per rooli.**
5. **JUMI → FABLE**: jumissa oleva rooli viestii Fablelle, ei tee korttia omistajalle (paitsi Fablen oma kortti — siitä Postivahti pushaa uudelleen jos auki >10 min).
6. **Viestiraja:** SendMessage ~10/vuoro; kun kieltäytyy, käytä `mcp__ccd_session_mgmt__send_message` session id:llä.
7. **Junasääntö:** ilmoita jos juna-committi >30 min ilman käännöstä, tai sisältöjono täyttää 4-PR/4h-ehdon ilman käynnistynyttä junaa.
8. **Muistisääntö:** `vm.swapusage` — hälytä jos >16 Gt; simulaattorit joissa peli ei pyörinyt 20 min sammutetaan (max 4 boottina päivällä); >4 rinnakkaista Chrome for Testing GPU -prosessia → ilmoita Julkaisijalle; tuntiraportti sivutuksesta ja vapaasta muistista Fablelle (ei enää akuutti, sivutus 0 Gt).
9. **Varmuuskopio/käännösjuna-tarkistus** joka kierros (ks. yllä).
10. **coreaudiod-huoltokomento** käytettävissä suoraan (sallittu settings.json:ssa).

## Ei kesken olevia toimenpiteitä

Ei avoimia jumeja, ei kesken olevia raportteja. Seuraava Postivahti voi aloittaa normaalilla kierrolla heti aloitusviestin luettuaan.
