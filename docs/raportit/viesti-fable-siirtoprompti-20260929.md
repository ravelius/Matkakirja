# Siirtoprompti tilinvaihtoa varten (Päätoimittaja 29.9.2026 klo 16.4x)

Omistajan käsky 29.9. klo 16.3x: "sen jälkeen voisit lopettaa muut sessiot ja tehdä siirtopromptin" (alkuperäinen
sääntö: viikkoraja 97 % → sessiot seis + siirtoprompti; viikko oli 94–95 %). Vanhan tilin sessiot on pysäytetty.

## 1. Ensimmäinen viesti uuden tilin Päätoimittaja-sessioon

Omistaja avaa uuden session kansioon /Users/Shared/Claude/Matkakirja-fable (Opus, xhigh) ja liittää:

> Olet Päätoimittaja (ent. Fable), Matkakirjan päätoimittaja. Checkout /Users/Shared/Claude/Matkakirja-fable, haara
> claude/bold-ride-vow4ki. Aja `git fetch origin && git checkout claude/bold-ride-vow4ki && git pull`. Lue CLAUDE.md,
> Raamatun Ydinajatus kohta 2 ja docs/raportit/viesti-fable-siirtoprompti-20260929.md KOKONAAN. Muisti MEMORY.md
> (erityisesti omistajan-toimet-korttina, kortti-pysayttaa-paatoimittajan, viikkoraja-97-siirtoprompti,
> sessioiden-luonti-appia-ohjaamalla). Luo roolisessiot kohdan 3 taulukon mukaan, lähetä kullekin sen aloitusviesti,
> kytke oma Remote Control päälle ja jatka kohdan 4 jonosta.

## 2. Tila 29.9. klo 16.4x

- **TestFlight sisäisessä ryhmässä:** 1.0.44 (luennan alku, avausanimaatiot, maakuntalappu), 1.0.48 (avaruuskävely,
  ISS-tervetulo, Kertoja-kytkin, kartuscha, pelaajan näkymä kehittäjätilassa) ja 1.0.49 (yläpalkki ja pillerivalikko).
  1.0.45–1.0.47 ohitettiin, koska seuraava versio sisälsi ne. **1.0.50** (iPhonen nahkayläpalkki, proto master cbf78690,
  build 202609291251) oli viennissä klo 16.3x, joten tarkista Julkaisijan luovutuksesta, lähtikö se.
- **Web:** kartta 2026-09-27 tuotannossa klo 08.43. Mainissa ovat avausanimaatiot (#3605), pelaajan näkymä (#3608),
  tervetulon korjaus (#3609), pariteettikorjaukset (#3622) ja tuontikorjaus (#3623, v2405). Auki: yläpalkkierä #3624
  (junassa), Liiku #3627, Raamattu #3602 (avaus/sulku animoiden), savukkeet #3606, linssien esittelyt #3611,
  pariteettiraportti #3619 (docs), joet #3614 ja #3574.
- **Jokipoltto** 2026-09-30-pohja (GEOGLOWS-joet) on käynnissä vahdin alla hakemistossa pyramidi-poltto/ajo-20260930.
  Vaihe 1 valmistuu arviolta 18.2x, syvä z9–z10 ja pallo 30.9. päivällä. **Vienti ja osoittimen vaihto vaativat
  omistajan luvan:** kuvat omistajalle ensin.
- **Codex-tilaukset auki (posti/, claude/postilaatikko):** puuradio v3 (`fable-codex-radio-yksikuva-v3-20260929.md`:
  näyttö valonlähteeksi, muu runko tummemmaksi). Omistaja haluaa nähdä kuvan heti, ennen kytkentää.
  iPad-yläpalkkia EI ole vielä tilattu: tilaa vasta, kun omistaja on nähnyt iPhonen nahkapalkin pelissä.
- **Julkaisijan pysyvät sallinnat** ovat voimassa (gh workflow run, workflows-muokkaus, worktree remove).

## 3. Roolit (checkout, haara, luovutuksen SHA, malli)

| Rooli | Checkout /Users/Shared/Claude/… | Haara, luovutus | Malli | Kärki |
|---|---|---|---|---|
| Postivahti | Matkakirja-posti | postivahti | Sonnet, medium | kierto 10 min, 70 %:n kontekstivahti, viikkoraja 94/97 % |
| Julkaisija | Matkakirja-julkaisija | julkaisija-luovutus-20260928 eeb378f63 | Opus, high | TF 1.0.50 ajo 36576368826 (tarkista), #3627 junassa, jokien vienti omistajan luvalla |
| Natiiviseppä | Matkakirja-3d-selvittaja | selvittaja-3d-luovutus 6c7465d74 (+ päivitys) | Opus, max | keittiön merge 573ccecc seuraavaksi junaksi |
| Natiivi-UI | Matkakirja-natiivi-ui | natiivi-ui-luovutus-m b755e7850 | Opus | iPad-yläpalkki (odottaa Codexia), avausanimaatioiden loput |
| Pelikoodari | Matkakirja-pelikoodari | pelikoodari-tyo-20260923 7273a4a13 | Opus | webin nahkayläpalkki WIP (pelikoodari-ylapalkki-nahka df49af37d); #3624 mergetty, #3627 ja #3611 auki |
| Linssiseppä | Matkakirja-linssiseppa | linssiseppa-tyo-20260923 d9738f3bb | Opus, max | jono tyhjä, anna uusi erä |
| Linssiseppä 2 | Matkakirja-linssiseppa-2 | linssiseppa2-tyo-20260928 d2afb0eb4 | Opus, high | puuradio v3 omistajan OK:n jälkeen |
| Linnanrakentaja | Matkakirja-linnanrakentaja | linnanrakentaja-tyo-20260929 292e07f63 | Opus, max | keittiö hiomassa; yleislinna (erä 3) |
| Siirtoseppä | Matkakirja-siirtoseppa | siirtoseppa-luovutus a38eea94d | Opus | jono tyhjä, anna uusi erä |
| Karttaseppä | Matkakirja-karttaseppa | karttaseppa-tyo-20260922 8dcb7190f | Opus | jokipolton seuranta, vientikuvat omistajalle |
| Sisältökirjuri | Matkakirja-sisaltokirjuri | sisalto-pelikatalogi-20260927 a93e7e4f8 | Sonnet, high | #3611, maakuntajono |
| Laitetestaaja | Matkakirja-laitetestaaja | laitetestaaja-savukierros-b13 cd8f9b917 | Sonnet, high | savukkeet pyynnöstä |

Aloitusviesti kullekin: "Olet <Rooli> (<malli>). Lue CLAUDE.md, Raamatun Ydinajatus kohta 2 ja
docs/raportit/viesti-<rooli>-aloitus.md omasta haarastasi sekä sen osoittama luovutus, jatka. Päätoimittaja on
<uusi id>." Sessioiden luonti: muistio sessioiden-luonti-appia-ohjaamalla (osascript; Trust = Tab + Return).

## 4. Omistajan linjaukset 29.9. (kaikki lokissa, grep "29.9.2026")

- **Omistajan toimet:** otsikko `## ⚠️ TOIMI TARVITAAN`, lihavoitu yhden rivin ohje ja kopioitava koodilohko.
  Kortti vain lyhyenä kuittauksena. "Näytä vain kuvat": hyväksyttävistä kuvat heti, vähän tekstiä.
- **Kortti pysäyttää Päätoimittajan:** reititys ja VIE ensin, kortti viimeisenä. Yöllä makuasiat ilman korttia.
- **Avaus ja sulku aina animoiden** (Raamattu-PR #3602): 220/200 ms napin suunnasta, ei viivettä, poikkeukset 320/280 ms.
- **Yläpalkki:** matkalaukkunahka (Codex), logo vasemmalle ja pilleri oikealle leveimmän saaren ulkopuolelle,
  keskitummennus, iPhone ensin. Pilleri avaa valikon, jossa Linssit ja Aarteet ovat omina näkyminään (esikatselu ja
  Aktivoi/Näytä). Logo avaa tekijätiedot ja Pelin tilannesivu -napin.
- **Radio:** alkuperäinen puuradio yhtenä kuvana, radio aina päällä, kytkin sulkee linssin. Kuunvalo hylätty.
  Radiolinssin uudistus vain natiivissa.
- **Elävä linna:** vapaasti pyöriteltävä 3D, kaarilennot, Codexin pinnat (B) ja tumma tunnelmavalo.
- **Maailmatilan Pelaajan näkymä** (himmeät kohdekaupungit) on valmis molemmissa.
- **Pulu pysyy ElevenLabs v4:llä:** Gemini 3.8 Flash TTS testattiin, halvempi mutta alkaa puhua 0,7 s hitaammin.
- **Kone:** 29.9. koko päivän rooleilla. Normaalit säännöt palaavat 30.9. klo 00.
