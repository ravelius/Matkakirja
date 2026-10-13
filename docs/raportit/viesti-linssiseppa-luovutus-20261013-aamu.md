# Linssisepän luovutus 13.10.2026 aamu (PT:n nollaus 07.4x, konteksti 95 %)

Proto-git /Users/Shared/Claude/proto-3d/Matkakirja-proto (paikalliset haarat, ei pushia). Käännös- ja simuvuorot vain Julkaisijalta:
KÄÄNNÖS NYT → kirjoita itse `linja-<nimi>.txt` + `kaannos-<nimi>.nyt`, SIMU NYT → `simu-<nimi>.nyt` (kansio proto-3d/tyokalut/linssiseppa-ajot/),
ilmoita LUKKO VAPAA / SIMU VAPAA. Ketjut irrotettuna `perl -MPOSIX=setsid -e 'setsid(); exec @ARGV' nice -n 15 zsh ajo-….zsh`.
Ennen käännöspyyntöä: `git merge-tree --write-tree master <haara>` ja `zsh tyokalut/tarkista.sh 2>&1 | grep "virheitä yhteensä"` (= 0;
tail -1 ei näytä Unity-virheitä). Testit `sh Linssit-testit/kaanna.sh` (EI zsh). Masterin PuuttuvatAanetTestit.TehosteetKytketty kaatuu jo
pohjassa (DioraamaSovitin repliikit-lapi-v2), ei meidän. Edellinen luovutus: viesti-linssiseppa-luovutus-20261012-ilta.md.

## 1. KÄYNNISSÄ / ENSIMMÄISENÄ
- **Museon kävely (omistaja 07.1x + 07.2x)**: linssiseppa/museo-streetview-187 **afb434b87** (pohja f8040bf37 = juna 186:n museo),
  wt /Users/Shared/Claude/wt/proto-linssiseppa-v6. Napautus lattiaan/teokseen = pehmeä liuku ~1 s (MuseoLiuku), välähdysrengas
  (MuseoRengas, Tyylikirja.Kehys.InkLight), askeleet (MuseoAskeleet, ämpäri aanet/museo-askeleet-v1; **oletus kaiullinen -sali-versio**,
  vakio `MuseoAskeleet.Oletus`, omistaja valitsee kuiva/kaiku äänisivulla → yhden rivin vaihto). Ei sormirengasta, ei nuolia.
  Vinkki "Napauta lattiaa tai teosta." Testit 1703/1704. Käännös 3c719ab17 (07.38) → **ajo-kavely187.zsh** pyörii (iPad + iPhone,
  sk-kavely187-{ipad,iphone}.txt, video + aani-alku/-loppu). Kun "SIMU ALAS": kerro Julkaisijalle SIMU VAPAA, tarkista kuvat
  (lokit/todistus-kavely187-{ipad,iphone}-*/kuvat/raaka/k1–k4), yhdistä video + ääni (ffmpeg, aani/kavely187-<laite>.wav), lähetä
  PT:lle täysikokoiset kuvat (rengas, perillä, teos) + video äänellä → kuittaus → SHA NS:lle (juna 187).
- **Juna 187 kaupunkierä**: linssiseppa/kippi-lontoo-praha-187, wt /Users/Shared/Claude/wt/proto-linssiseppa-kippi187.
  **bb370c6ef PT KUITTASI, SHA NS:llä** (17 kaupunkia: Lontoo, Praha, Wien, Rooma, Berliini, Kööpenhamina, Helsinki, Barcelona, Lissabon,
  Madrid, Marseille, Ljubljana, Granada, Budapest, Firenze, Edinburgh, Dublin; vasen liikenne KatuLiikenne.Vasen; reitit vain t=="tram";
  lautat veneinä; KaupunkiVaihtui-korjaus; Budapestin tekijät Tietoja.cs). Simu 3 OK: todistus-elava-187c-ipad-20261013-0704.
  **Jatkoerä kuittaamatta**: 45ed5f164 (Ljubljana Mestni trg) + 051643d5f (Oslo, Bergen) + **cd0fbaac5** (Oslon/Bergenin kamerarivit).
  Vesi index-v12 ämpärissä (07.38). → käännös + lyhyt simu (Oslo) + kuittauspyyntö PT:lle → SHA NS:lle.
- **Bryssel, Amsterdam, Krakova VALMIIT KS:llä (07.4x, kippi mukana)**: T7 _tyo/karttaseppa/kaupunki-{bryssel,amsterdam,krakova}-20261013/,
  Paketit ("bryssel", 50.85045, 4.35292, 8000), ("amsterdam", 52.3661, 4.90092, 8000), ("krakova", 50.05902, 19.9439, 8000); maa + puut
  ämpärissä 07.38 (puiden tavukoot: curl -sI media.matkakirja.app/kartta/puut/v1/puut-<id>.bytes). KS: Krakovan Rynek-kaari voi osua
  Eros Bendatoon (suojattu) → katso laatoista; Amsterdamin Dam-kamera katsoo poispäin Nationaal Monumentista. Jonossa KS:llä: Sevilla,
  Sofia, Bukarest, Tampere, Vilna, Valletta, Ateena, Košice, Luxemburg, Venetsia, Islanti, Sisilia, Kreeta (NS: jos Resources > 25 Mt
  lisää, kaupungit ämpäriin). Tee samalla
  tavalla (agentti, sama haara/paketti _valmiit/elava-lontoo-praha-vienti-20261013, uusi vesi-indeksi v13, jos indeksi muuttuu).
  Kamerarivisääntö: ≤ 100 m, ei kaksoisrivejä, ei reunarakennusta, ei tornisääntöä rikkovaa.

## 2. JUNA 186 (valmis, NS:llä)
- Taidemuseo: linssiseppa/museo-v6-184 **f8040bf37** = v6 OLETUKSENA (NS mittasi v6 = v2g muistissa: 2821 vs 2829 Mt). Sisältää
  v6-salin (ämpärissä sali-v6), kevyen himmennyksen 70 %, kehykset Yövartion tapaan (tasaisuus 0,7 + hajavalo), kuvalähestymisen v2
  (Astu sisään -nappi, puhe aanet/taidemuseo-esittely-v1, infolappu, ei automaattista sisäänmenoa), vapaan kävelyn, penkit esteinä
  (UudetPenkit / OsumaEsteet), NUI:n pystyotsikon jaon f83ed1201 (**odottaa omistajan aamupäätöstä**, PT vie). Kuva oletusasetuksin:
  lokit/taidehalli-v6-20261013/12-oletus-v6-kunniagalleria-ipad.png (PT:llä).
- Salikuvat NUI:lle: lokit/salikuvat-v6-20261013/ (7 kpl). NUI:n salikuvat-186 0edda6a62 yhdistetään vasta PT:n kuittauksen jälkeen.

## 3. MUUT AVOIMET
- Lontoon pallokierros: karkeat laatat edustalla → tarkista hiljaisena hetkenä (PT: TF:n jälkeen).
- Codexin rijksmuseum-julkisivu-pysty/-vaaka.jpg (SK tilasi) → Resources/Museo/ + lahestyminen.json kuvat.pysty/vaaka (havainnekuva).
- Kipin aukioiden katsesuunnat uusissa kaupungeissa simulla (KS:n huom_rakennus-poikkeukset Trafalgar, Gendarmenmarkt, Senaatintori).
- Muistikarsinta A (pallon kamera lepoon) peruttu 5f75ac31e: Ruudunpaivitys sammuttaa pallon kameran jo peitossa.

## 4. TYÖPUUT JA APPIKOPIOT
- wt: proto-linssiseppa-sali3 (museo-sali3-184, jäänyt jälkeen; v6-haara on museon pää), proto-linssiseppa-v6 (nyt museo-streetview-187),
  proto-linssiseppa-kippi187 (kippi-lontoo-praha-187). Poistettu: katso2, maav2, pallokisa, pallokierros, lahestyminen, kuva2.
- Appikopiot lokit/linssiseppa-app/: sali5d-184, sali6*-184, oletus-v6-186, elava-187*, kavely-187, muisti-186.

## 5. SÄÄNNÖT (muistutus)
Agentit vain Opus/Sonnet. Viestit PT:lle vain valmis erä, jumi tai kysymys, ≤ 8 riviä, suomeksi; PT:n viestit istuntotunnuksella
(mcp ccd send_message local_8d8ebf72-…) jos socket vaihtunut. Omistajalle vain pelikuvat täydellä tarkkuudella. Ei pkill -f, ei rm
muualle kuin omaan. Perl-korvauksissa ei |-erotinta, jos tekstissä on |. "ui pois" pimentää museon (museo piirtyy UI:n kautta).
