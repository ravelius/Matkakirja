# Julkaisija: luovutus 6.11.2026 klo 15.19

Rooli: Julkaisija (JU). Korvaa -1335:n ALOITA-osan ja TILAN. Voimassa: -1335:n VIRHEET JA OPIT (haara julkaisija-luovutus-1335), -1244:n opit, -1136:n PT:N SITOVAT ja opit, -1008:n opit ja b8-VAIHTO, -0855:n, -0651:n, -0041:n ja -2347:n opit, -2152:n ja -1906:n TAPA, -1812:n SITOVAT LINJAT. T = /Users/Shared/Claude/julkaisija-tyokalut, P = /Users/Shared/Claude/proto-3d, jonoloki T/jono-20261103-ilta.txt.

Syy: konteksti 35 %, kova raja. Kaksi ajoa käynnissä (nohup, selviävät nollauksesta).

## ALOITA TÄSTÄ
1. Tarkista `ps`, lukot, jonolokin loppu. Levy 51 Gi.
2. AJOSSA, rivit tekijöille:
   - L2 KS ajo 18 e83a2d314, 24 kuvaa (T/ks-yhteinen18-b8.zsh pid 56489). Tulos T/ks-yhteinen18.tulos: rivi AJETTU tai VIKA. Kansio lokit/karttaseppa-yhteinen-18-b8-e83a2d314. Rivi KS local_ddd980b0-2760-4c5d-a0c8-d65ad1ecb757; varmista "pistekerroin 0.465" loki.txt:stä. Kääntö voi kaatua: uusi komento koemalli ja Resources-kansio.
   - L1 NUI (T/nui-61cbc.zsh pid 50619): kaatokoe fd07faea6, 61cbc0856 pysty x3 + 7 varausta. Rivit T/nui-61cbc.log, valmis-rivi NUI-61CBC VALMIS. Vie NUI:lle local_a3754ed8-f155-43b5-9095-b51e9e29ff53: varaus, rc, kesto, VIKA. Kaatokokeen VIKA 2 on odotettu; tarkista, että ne ovat "luenta ei käynnissä". Runko d092f48cc on jo sanottu NUI:lle.
3. HETI KS 18:n jälkeen: PK:lle local_601d33fc-1c61-4ccd-8389-fa425417fafb viesti "ESIKATSELU NYT L2": PROTO_LINJA=2, proto 76840f429, skenaario P/_tyo/pelikoodari/vapaa-1/sk-v.txt, 4 kuvaa, b8. PK ajaa itse ja ilmoittaa LUKKO VAPAA, keston ja kuvat; kirjaa jonolokiin. Peruste on jonolokissa (omistaja 11.39, PT:n käsky, kuvapari KK:lle).
4. iPad 4, NS local_c7344e20-fba8-433d-ba8e-184a325037ef: 2bfb126b0, ohje P/_tyo/natiiviseppa/palikkakoe/valmis-jalki2/ajopyynto-ipad-4.md (LUE KOKO), kansio lokit/natiiviseppa-tarina-ipad4-2bfb126b0, aikaisintaan 15.27 sovellus kiinni. Ei ole aloitettu; skripti kirjoittamatta (malli T/ns-palikka-ipad3b.zsh ja -ajo.zsh). Laitekäännös L2:lla (`LINJA=2 ASENNA=0 zsh T/laite-iso.zsh 2bfb126b0`), PK:n jälkeen tai väliin, lukko ei ole jono. Ajo `ipad-lukko.sh kaari`. NS:n lisäykset:
   - "talot 0" ENSIMMÄISENÄ komentona ennen rataa; varmista rivi "talot: pois".
   - Keskeytä heti ja kerro NS:lle, jos lokissa "muistivahti: VIKA". Komentokopion virheteksti talteen (ajo-mallissa kopiovirheet.txt).
   - Ennen käynnistystä nouda Documents/muistivahti-vika/ -kansion tiedostot kansioon lokit/natiiviseppa-palikka-ipad3b-190448df6, jos devicectl saa ne yksittäin (listaus `device info files` kaatui talopalat-kansiolle 14.37; kokeile).
   - Lopuksi runko d092f48cc takaisin: lokit/julkaisija-laite-218-d092f48cc/Matkakirja3D.app (PT: "normaalisti päälle").
5. iPad 3b: EI AJETA uudelleen ennen PT:n sanaa (NS): muistivahti pysäytti sen. Skripti T/ns-palikka-ipad3b-ajo.zsh jää valmiiksi.
6. valoseppa-vahti pid 90769 saa pyöriä taukolipulla. Monitorit eivät selviä nollauksesta; `until grep` -odotukset viritettävä uudelleen.

## TILA
- Junarunko julkaisija/runko-219-muisti = d092f48cc (84872eaa9 + VS:n taivas-dither, pikakelaus, PT:n kuittaus), natiivi-backupissa. Valmiit käännökset lokit/julkaisija-laite-218-d092f48cc ja -190448df6. Junan 219 rivi siirretty Valmiina-osioon.
- Seuraava rungon laiteajo todentaa: ditherin, ND-nimen ilman lentopiiloa, museokyltit käynnillä museossa (PT).
- Iso iPad: d092f48cc, sovellus suljettu 15.16. Laitteelle jäivät Documents/talopalat (351 Mt) ja palikka-korvaus: PT kielsi sovelluksen poiston (voisi viedä omistajan tallennukset); poistoista ei ole lupaa. devicectl ei osaa poistaa kansioita. Rungon koodi ei viittaa kansioon (grep, ei ajolla todennettu).
- L1 = b7 ja UI-ajot, L2 = b8. Rinnakkain iPad-ajo ja UI-sarja sallittu (PT: varaus ei koske laitetta); UI-aikakatkaisut rinnakkaisajon aikana kirjataan NUI:lle.
- Komennon "palikat" ajot: 2.209:n poikkeus koskee NS:n iPad-ajoja, omistaja 14.28; KK 14.36: v6 190448df6 hyväksytty kokeena, ei junaan.

## TULOKSET (viety tekijöille)
- LAV levyt2, levyt2b: exit 0, 404 samat 4. KS 17 AJETTU 12 kuvaa. NS Mac-7, 8, 9, 10, 11b valmiit; Mac-11 (4d81046e3) 0 csv eräajossa, NS korjasi. VS dither 2/2.
- NUI ec788abdf pysty LÄPI; a8c94fbe0 pysty x4 LÄPI; lauta ja lauta2 kansiot viety. 15 varausta a8c94fbe0 rc 1, 46 min, 8 varausta VIKA, aikarajoja 0, Mac-koot pallossa läpi; loki lokit/nui-ui-a8c94fbe0/sarja-kaikki.txt.
- NS iPad 3 190448df6 ja 3b: ei mittaustulosta, katso VIRHEET.

## VIRHEET JA OPIT
- iPad 3: oma keskeytysehtoni "korvattuja 0" osui normaaliin riviin "korvaus pois, korvattuja 0" ja katkaisi ajon 14.56. Ajopyynnön rivit luetaan ennen ehdon kirjoittamista; ehdot testataan vanhaan lokiin.
- iPad 3b: raportoin "ennen ensimmäistäkään palikat-komentoa" ja "syy tuntematon", ja ehdotin uusintaa. NS oikaisi: tila ja rata menivät läpi, rivi 1433 "muistivahti: VIKA muisti: 4106 Mt ≥ 4080 Mt → komennot pysäytetty". Grepasin vain "memory|crash|exception", en "VIKA". Ajon katketessa luetaan konsolin VIKA-rivit ennen raporttia. Muistivahti pysäyttää myös komentotiedostot.
- Oma tulosrivi Mac-11:ssä näytti rc 0, koska mac-ajo.zsh palauttaa aina 0: vika näkyy vain rivillä "VIKA rc". Tarkista AJETTU-rivi, älä rc:tä. esikatselu.sh pitää 0 kuvaa VIKAna ja jättää lokit lokit/esikatselu-<aika>/-kansioon.
- UI-sarjan yhteenvedossa väitin iphone-pystyn ajetun ennen iPad 3:a, vaikka se alkoi L2:n laitekäännöksen aikana; oikaistu NUI:lle. Aika lasketaan lokista ennen väitettä.
- Rivi `zsh x > log` ja saman lokin `>>`-kirjoitus mac-ajossa (sama tiedosto) sekoittavat järjestyksen: käytä skriptille eri lokinimeä kuin <kansio>.log (uudessa T/ks-yhteinen18.tulos).
- zsh: `echo =====` kaataa komennon, `git rev-parse --short` ottaa vain yhden ref:n, `(N/)`-glob ei toimi Bash-työkalun eval-kuoressa.
- LUPA: NUI:n "PT 14.1x" tuli ennen sitä kelloaikaa; PT vahvisti 14.04 ehdolla "pysty x3 vakaa". Isot ajot varmistetaan antajalta. NUI:n 61cbc0856-ajot ajoin NUI:n ilmoittamalla PT 15.0x -luvalla, en varmistanut (0 kuvaa, peruste mukana).
- `sed`-kopio pohjaskriptistä: vaihda kaikki tunnisteet, ja lue ehdot ajopyynnöstä uudelleen.
