# PT:n luovutus 7.11.2026 klo 12.24 (tili vvi@vvi.fi; konteksti 30 %, pehmeä raja)

Korvaa -1137:n JUNA- ja AJOSSA-kohdat; -1104:n ja -1012:n OPIT, -0855:n ULKOISEN EHDOT ja ALOITUKSESSA voimassa. Id:t osoitekirjassa. Taulu Qo5w6Wk4JSYRwYbyf2fJrm. Loki: worktree /Users/Shared/Claude/wt/pt-loki-20261107-1049 (switch -c uusi origin/main; node tools/raamattu-kirjaa.mjs); pelkän lokin PR:lle ei ajeta tarkistuksia, tarkista gh pr diff --name-only ja yhdistä. Monitorit: hooks/odottajat-vahti.py, hooks/codex-posti-vahti.sh, levy alle 20 Gi (30 min, viritä uudelleen).
Proton commitit: git -C /Users/Shared/Claude/wt/proto-karttaseppa-vahdit, remote natiivi-backup; eivät näy tämän checkoutin origin:ssa.

## OMISTAJAN PÄÄTÖKSET
11.42 Lontoon isot (cbfb96542) sisäiseen koeversioon, kun kyltit korjattu (PR 6455). 11.52 juna ODOTTAA talot kauemmas; pallon elämä kartalla kokeena ennen junaa, ei Cesiumin kuukausitilausta, puolipilvinen päivä, muisti lopuksi (PR 6456). 12.09 maalatut julkisivut kokeeksi ("miten ne kannattaa maalata?"), kivet koodina junaan, usva 16 km mukaan, kun kuvattu ennen junaa (PR 6458). 12.13 KK: kivet EIVÄT mene junaan, ennen kuin seinäajo kertoo (korvaa junavuoron). 12.22 tumma valikko kelpaa (EI VIELÄ LOKISSA: kirjaa).

## JUNA 220: LÄHTÖ MINUN RIVILLÄNI "VIE 220 KOEVERSIONA"
julkaisija/juna-220 = 84deb0978, ei käännetty. Sisäinen, ei lukitusta, ei mainiin, ei korvaa korttia Pariisi valmis.
JUNASSA: Taso keskelle f86344e8f, valkoiset a89993465, yöportin kopiot 497782741, puomi 15c97cc56 (testin varassa, juoksua ei kuvattu), häivytystesti 2190c6870 (junavuoro annettu, JU vahvistaa), NUI 6 committia e65e82df9 + 95c540690 (sormi ja laite todistamatta; veloitus Macilla ja iPadilla saldoista), vahtierä 41022d9db (vuoro annettu; varmista junasta).
EHDOT ENNEN VIE-SANAA:
| Kohta | Tila |
|---|---|
| Talot kauemmas 5488bdd8b | sk-muisti3 (kallistus portain, sitten 4 km) iPadilla; KS. VIKA: ei neljättä, KS tutkii kuvat 150 Mt ja keko +115 Mt. Säteestä ei tingitä (huippu latauksesta). |
| Pallon osat koe | VS 1–3 (film1 bf2c4902d, terävöitys f9f4eb9fe, vain pilvien varjot, ilmaperspektiivi pois, syvyyskuvan hinta raporttiin); NUI 4–5; KS aineisto NUI:lle; puut ja vesi jakamatta. Omat haarat, junaan vain kortilla kuvista. Suunnitelma scratchpad/keskustelukanava/suunnitelmat/20261107-pallon-elama-kartalle.md |
| Usva 16 | Ajo 49 Y e52a8cb7f 83 kuvaa JU:lla; kuvat KK:lle; junavuoro minulta. Mukana r6-pohjat ja talot v20 sovelluksen mukana: arvioi nämä, ennen kuin annat vuoron. |
| Lontoon kyltit + isot | PK i7 f9106079e JU:lla, 6 kohtaa (mukana "Lontoo"-nimi), kuva KK:lle. Hintakyltti katoaa myös pallon yleiskuvasta mallin kohdalla: kerrottava. Muisti yhteisajossa. |
| Lontoon kamera + lähizoom dd3a2e10f | Kertoja2 59abbd78a iPadilla seinäajon jälkeen; omistajan havainto toistamatta. Ei kolmatta. Vuoro sen jälkeen. |
| Kivet dc4b1c69c | Peruttu revertillä; takaisinotto = revertin kumoaminen, vain sanallani. Seinäajo sk-seina-ipad a8b873e5d (pid 86082) muisti3:n jälkeen. Jos vika kivistä: uusi kortti. |
| Muuri, runko puuttuu iPadilla | Mac kokonainen, iPad ei; pari _tyo/linnanrakentaja/muuri/aukot/. Syy auki, LAV. KK: junan korjauksiin. |
| Keisarin jalat | Noin 0,25 m lattian alla kartan takia (LAV, epäily kulkukartta.py:154 floor). PK tai sen luovutus. |
| Yöportti | Vihreä 42361851841 rungolla 881fcd30d, node 22 (PR 6457). Aja lopullisella rungolla ennen VIE. |
EI JUNAAN: yksi tarkkuus. Konsolipalat julkaistussa v115:ssä, vain tieto KK:lle.

## MUU AJOSSA
1. Yksi tarkkuus NS: d2ba2f540 (beige läikkä), vaihtoajo, Seine 46b7cf417 (vain Pariisin seutu; koko kartta = tyyliversio, oma päätös). Pyynnöt 85°: 3474 vs 165; alareuna suttuinen. NS tuo yhden suosituksen, sitten KK:lle.
2. Julkisivut: Codexin pala #2194 (6e48a129e) KK:n arviossa; saumaero enintään 7/255, qualityPass=false; minusta tasainen ja kaavamainen. KK:n vastaus → kuittaus Codexille ja kytkijän valinta. Ei Codexin kuittausta vielä.
3. Lontoon kumpu: korkeusdatan virhe (Holborn 57 m laatassa, pelissä 114 m), Mapterhorn robots kieltää ClaudeBotin: EI hakuja. KK näyttää Lontoon isojen kuvan kanssa. Ei korjausta.
4. VS pkill -f 12.1x: JU tarkistaa, kuoliko jotain; kuvio VS:ltä kysytty.
5. Levy 23 Gi. Pack 5,5 G checkoutissa (12.14) jää. Postilaatikko-worktree vie 6,2 G: tee ja poista heti.
6. Työlista: ovet, Codexin nähtävyydet ja Pariisin kyltit yhä ilman tuoretta tilannetta; kysy tekijöiltä, älä arvaa.
7. SendMessage-raja: pysähtyi 12.0x; käytössä mcp__ccd_session_mgmt__send_message (CLAUDE.md, VIESTIRAJA).

## OPIT
- Älä selitä kuvan vikaa arvaten: väitin a89993465:n poistavan a5:n valkoiset talot, vaikka commitin viestin mukaan testiajon varatalot säilyvät; korjasin kahdelle roolille.
- Lue omistajan alkuperäiset sanat ennen suositusta: suosittelin Poistua junaan näin, vaikka omistaja oli jo sanonut sen heikoksi.
- Älä anna junavuoroa, kun tulos on vielä tulossa: annoin kivet ja jouduin perumaan; vuoro vasta avoimen selvityksen jälkeen.
- Oma työni voi olla levyn syy: katso omat worktreet ensin.
- Junavuoro haaran keskeltä: kysy riippuvuudet (4 vs 6 committia).
