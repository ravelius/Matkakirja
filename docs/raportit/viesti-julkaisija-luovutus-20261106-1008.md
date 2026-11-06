# Julkaisija: luovutus 6.11.2026 klo 10.08

Rooli: Julkaisija (JU). Korvaa -0855:n ALOITA-osan. Voimassa: -0855:n, -0651:n, -0041:n ja -2347:n VIRHEET JA OPIT, -2152:n TAPA, JUNA 219 ja OPIT (haara julkaisija-luovutus-2152), -1906:n TAPA ja -1812:n SITOVAT LINJAT. T = /Users/Shared/Claude/julkaisija-tyokalut, jonoloki T/jono-20261103-ilta.txt. P = /Users/Shared/Claude/proto-3d.

Syy: konteksti 35 % (kova raja, Raamattu 7.37).

## ALOITA TÄSTÄ
1. Tarkista heti `ps` ja lukot: nollaus voi katkaista ketjun. 10.08 L2:lla oli UI-asettelutesti (pallo-keskitys, sitten linna-keskitys), L1 vapaa, jono tyhjä.
2. Käynnistä lukkovahti Monitorina (zsh T/lukkovahti.zsh, 30 min, uudelleen päättyessä).
3. UI-testi: `PROTO_LINJA=2 zsh /Users/Shared/Claude/wt/julkaisija-pk-218/tyokalut/ui-asettelutesti.sh addae63f2`, loki P/lokit/natiiviseppa-unity-b8-addae63f2/testit-UI.txt. Pallo-osa päättyi "VIKA aikaraja 6 min": ei läpäisyä, ei hylkäystä. Loki eteni ASETTELUTESTI OK -rivein, syy auki (T7-kopio ja nice 15 ovat arvaus; b7-vertailua ei ole). Linna-osan tulosta en ehtinyt lukea.
4. Kun testi on ohi, vie rivi PT:lle, NS:lle ja KK:lle: testisarjan tulos. Kartta 605/605, Linssit 2225/2225, Peli 826/826 (lokit testit-*.txt) + UI. Sano suoraan, jos UI jäi aikarajaan. KK: local_231e4bad (osoitekirja; muistin d5f31591 ei löydy).
5. PT:n avoin: 152 puuttuvaa metaa rungossa (lista P/lokit/kaannospalvelu/20261106-092559-addae63f2-l2-metat: Museo/alankomaat ja ranska kyltit 125, Juoksupeli 11, Kohdenostot 4 ym.). Puuttuva meta voi antaa eri GUIDin eri kopiossa. Selvitä rauhallisella vuorolla, kuuluvatko committiin ennen junaa; rivi PT:lle. Ei aloitettu.
6. KS:n, LAV:n ja VS:n ajot ovat tiheitä: L1 ja L2 molemmat käytössä. Kaikki jonossa ollut on ajettu ja ilmoitettu; VS:n raystas3-rivi oli 10.05 jonossa vastaanottajalla.

## b8-VAIHTO (omistaja 09.32 PT:n ilmoittamana, PT:n kuittaus)
- Junarunko julkaisija/runko-219-muisti = addae63f2 (7bbf04e09 + vain ProjectVersion 6000.7.0b8). Natiivi-backupissa 10.03. Ei TF:ää, ei vientiä, ei iPadia, ei muistia.
- PT sanoi cherry-pick; tein pikakelauksen update-refillä, koska 7bbf04e09 oli addae63f2:n vanhempi. Siksi commit-viestissä lukee yhä "ei vaihtoa rungossa" (kokeen ajalta). KS ihmetteli tätä; viesti ei ole enää ajan tasalla.
- Tarkistus b8-kirjastoilla: T/b8-jatko.log + lokit/natiiviseppa-unity-b8-addae63f2/tarkista-b8-kirjastoilla.txt, exit 0.
- Kuvapari b7 | b8: lokit/natiiviseppa-b8-vertailu-b7-7bbf04e09 ja -b8-addae63f2 (4 + 4, skenaario P/_tyo/julkaisija/sk-b8-vertailu.txt). NS "kuvat ok"; PT katsoi b-nd-45:n.
- Tuontijälki: T/b8-tuonti-jalki.zsh, lista tuontijalki-status.txt: 2 seurattua (URP GlobalSettings, PackageManager.policy; samat b7-ajossa 09.03, sisältöä ei vertailtu), 152 uutta metaa.
- Kopiot: proto-linja2:n Library on b8; muut b7, esikatselu-2:n b7-Library palautettu ja toimi (aukot9o, b7, 188 s). b8:n Library sivussa P/esikatselu-2-Library-b8 (6,3 Gt), käyttöä varten, poisto vain sanalla. b7-editoria ja T7-kopiota ei poisteta (PT). Vaihtolista: P/_tyo/natiiviseppa/unity-b8/vaihtolista.md.
- Valovahti: Y:n TaloKerros.cs, TaloKerros.shader, OhjelmaKohteet.cs ylittävät lähtötason; PT:n listalla ennen junaa. Ei poikkeusta. Y ei mene runkoon ennen ratkaisua.
- KS:lle kerrottu: kärki addae63f2, yhdistää itse kun jatkaa. b7-haarat kääntyvät b7:llä, kunnes yhdistävät rungon. LAV ja VS ajavat tarkoituksella b7:llä vertailun takia.

## AJETTU 08.59–10.05 (jonolokissa kesto ja kuvat)
LAV aukot7 (5), 7l (1), 7v (5), 8 (5), 8l (15), 8r (6, palautettu 14:stä), 9 (3), 9 uusinta (3), 9n (5), 9o (5), 9p (4), 9q (5), VS raystas1 (11), 2 (8), 3 (6), KS yhteinen-5 c0bfef077 (14), kattopari (4), yhteinen-6 251af3c48 (13). Kaikki exit 0, 0 Shader error, 0 error CS. Kuvia en katsonut, tekijät katsovat. Wrapperit T/lav-aja.zsh <linja> <nimi> <sha> <kuvia>.

## VIRHEET JA OPIT
- Pysäytin ajon b160104b7 PT:n "odottaa"-viestillä, ja heti tuli "ei seis": PT:n viestit menivät ristiin (PT: oma virhe, toimin oikein). Viestit voivat olla jonossa. Tarkista ajon tila ennen kuin vastaat.
- Pysäytys TERMillä ohittaa esikatselu.sh:n EXIT-trapin. Lukko, kopio ja Burst jäävät. Siivoa itse tarkistetuilla pid:eillä: git reset + clean kopiossa, burst_jit_palauta, lukko pois.
- Rungon vaihto: push natiivi-backupiin kuuluu samaan askeleeseen. Unohdin; KS huomasi 15 min myöhemmin.
- proto-kaanna.sh palauttaa kopion lepotilaan e51c33e0f (b5). Tarkistus tai testi siinä osuu väärään puuhun: checkout ensin, lukon alla.
- ui-asettelutesti.sh on repossa, ei P/tyokalut:ssa. Aja eri puusta kuin kopio, jonka se nollaa; tarkista HEAD ensin.
- Skenaarion tarkistus ennen ajoa ei paljasta valovahtia: esikatselu ei aja tarkista.sh:ta.
- Pyyntö ilman perustelua palautetaan (17.58): aukot8r 14 → 6 toimi. Älä hyväksy "PT:n käsky" -sanaa perusteeksi kuvamäärälle, vaan kirjaa se roolin ilmoittamaksi.
- SendMessage-raja (10 viestiä) pysäytti viestit: varakanava mcp__ccd_session_mgmt__send_message (CLAUDE.md, VIESTIRAJA). Kirjasin rajan ohitukset vain tähän.
- esikatselu-2:ssa seurannan ulkopuolinen tiedosto nimeltä `\v`: alkuperä tuntematon, en koskenut.
- zsh: echo === kaatuu (== not found).

## LISÄYS 10.19: KÄYNNISSÄ JA JONOSSA (korvaa ALOITA-kohdat 1, 3 ja 6)
Tarkista ensin ps ja lukot. Ketjut ovat taustalla ja saattavat katketa nollauksessa: ajamatta jääneet käynnistä itse. Ketju on valmis, kun sen lokissa on loppurivi. Ilmoita jokaisen tulos pyytäjälle; varakanava mcp__ccd_session_mgmt__send_message, jos SendMessage on rajalla.

L1 = b7-ajot, L2 = b8-ajot (esikatselu-2:n Library vaihtuu b8:aan yhteinen-7:n alussa, b7 sivuun P/esikatselu-2-Library-b7).
- L1: T/lav-aukot10u.log (LAV, kuvat-u, 5). Rivit LAV:lle: AJETTU + 404.
- L1: T/lav-aukot11.log (LAV, kuvat-va ja kuvat-vb, 5 + 5). Rivit LAV:lle.
- L1: T/vs-raystas4.log (VS, 9b9ff0036, raystas/kuvat4, 6). Rivi VS:lle.
- L2: T/b8-koko-testit: UI-ajo kesken, tulos T:n jonolokissa "AJO NS b8 addae63f2 UI-asettelutesti" ja lokit/natiiviseppa-unity-b8-addae63f2/testit-UI.txt. Pallo ja linna jäivät aikarajaan.
- L2: T/ks-yhteinen7-b8.zsh odottaa UI-ajon loppua (T/ks-yhteinen7-b8.log), kansio lokit/karttaseppa-yhteinen-7-b8-9f5e3e105, 9 kuvaa, 0.465. Polku KS:lle. Tarkista kansio palat-v9-louvre-halles lokista.
- L2: PK sk-u c9db47578, kansio lokit/pelikoodari-sk-u-c9db47578, odottaa loki-rivin YHTEINEN7 VALMIS. Polku PK:lle.

PT 10.0x, sitova järjestys näiden väliin: UI-uusinta L1:llä sisäisessä kopiossa. Aikarajan toistuessa sama UI-ajo b7:llä vertailuksi ennen kuin syytä pidetään b8:na. Sitten 152 metaa. Tulos PT:lle enintään 3 riviä. Komento b8: `zsh /Users/Shared/Claude/wt/julkaisija-ns-gc/tyokalut/ui-asettelutesti.sh addae63f2` (tarkista puun HEAD; L1 tuo Libraryn b8:aan Matkakirja-proto-kaannos-kopiossa, ei esikatselukopioissa). b7-vertailu: sama 7bbf04e09:llä.
Palautettu: VS raystas4 16 → 6 kuvaa, LAV aukot8r 14 → 6.
