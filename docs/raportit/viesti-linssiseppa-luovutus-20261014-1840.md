# Linssisepän luovutus 14.10.2026 klo 18.40 (NOLLAUS, PT:n pyyntö, konteksti 50 %)

Proto-git /Users/Shared/Claude/proto-3d/Matkakirja-proto (paikalliset haarat, ei pushia). Ajot proto-3d/tyokalut/linssiseppa-ajot/ (ketju `ajo-<nimi>.zsh`,
Julkaisija antaa `kaannos-<nimi>.nyt` / `simu-<nimi>.nyt`; ketjuun merge-base-vahti, joka pysäyttää jos käännös ei sisällä odotettua SHA:ta). Irrotus perl setsid.
Testit `nice -n 15 sh Linssit-testit/kaanna.sh` (+ `cd Peli-testit && sh kaanna.sh`), `nice -n 15 zsh tyokalut/tarkista.sh | grep "virheitä yhteensä"`.
Viestit AINA `send_message` session id:llä (/Users/Shared/Claude/osoitekirja.md); PT local_74630a27-8c1b-4ac3-9143-538efab8cbcd ≤ 3 riviä; Julkaisija
local_22b29f10-7af8-43fc-a974-1d666f716c97; KS local_37708e68-5a58-45ca-8dee-c13620993531; Valoseppä local_fc4fcc54-9fa1-4ba2-9de2-97a8ee884e10;
NS local_bf20055b-d582-4812-ba2b-b59c37a5e7b8. Simu iPad 00CF62C2 on joukossa `xcrun simctl --set "/Volumes/T7 4TB/Simulaattorit/Sarja"` (ilman --set "Invalid device").

## 1. KESKEN: PRAHA v5 -AJO JA KUITTAUS (PT: Josefovin repeytynyt etuala korjattava ennen kuittausta)
- Data: pallokierros-praha-v5 = v3 (Josefov 320) + v4 (Vyšehrad 75, KS v4c) + v5 (Josefov silmä 70–85, KS v4d). Haara linssiseppa/ateena-pallo-190 5ff1f17db.
  Vienti _valmiit/opas-pallokierros-praha-v5-vienti-20261014 (SHA 933b68b2…) PYYDETTY Julkaisijalta 18.38 – tarkista kuittaus (praha-v3 ja -v4 jo ämpärissä).
- Testihaara linssiseppa/lontoo-testi-190 94e775f54 (wt /Users/Shared/Claude/wt/proto-linssiseppa-lontootesti190) = ateena-pallo-190 + Valosepän
  linssiseppa2/lontoo-korkeus-v2 fdebada27 (Lontoo v5, Prahan matala porttitasanne). VAIN AJOA VARTEN, ei junaan.
- Ketju VALMIINA mutta EI käynnissä: `ajo-pallot-testi3.zsh` (Praha v5, skenaario sk-prahapallo6-ipad.txt, app pallot-testi190c, vahti 94e775f54).
  Käynnistä perl setsid -> Julkaisijalle KÄÄNNÖSPYYNTÖ kaannos-pallot-testi3.nyt (L2) -> LUKKO VAPAA -> simu-pallot-testi3.nyt -> SIMU VAPAA.
- Katso k05 Josefov (ei repeytynyttä etualaa?) ja k08 Vyšehrad (tasanteelta) -> arkki PT:lle -> PT kuittaa -> junahaara kuten Ateenalle (alla 2).
  Lennot: → Josefov 24 s (suunta 320 Kafka-poikkeus, KS: ei lyhennettävissä), → Kaarlensilta 25 s (ennallaan). Portti Prahassa 8–10 s (fdebada27).
- Junahaaraa EI voi ottaa suoraan ateena-pallo-190:stä Prahan osalta, jos Lontoon haara ei ole junassa: tee kuten ateena-v6-191 (cherry-pick
  e09f27f7d, ee3fa2b13, 5ff1f17db juna-haaran päälle; Versiot-rivi ja testirivit ristiriidassa – kaikki kaupungit mukaan).

## 2. KUITATTU JUNAAN 191 (PT 18.3x)
- Ateena v6: haara linssiseppa/ateena-v6-191 55e893790 (wt …/proto-linssiseppa-ateena191; juna-190:n 5de99d22c päällä: Ateena v5 Erekhtheion 40–50,
  Valosepän valoverho ≤ 40 m + komento `opas korostus 0|1|verho 0|1|tila` (8abf75061), verho oletuksena pois (660252ca2), Ateena v6 Tuulten torni 70–85).
  Lähetetty NS:lle 18.3x. Data ämpärissä opas/pallokierros-ateena-v6/ateena.json (d278f771). Todistus todistus-ateenapallo7-ipad-20261014-1747.
- Lontoo v5 (Valosepän haara, hänen vientinsä): Greenwich 157 / 44 s lento HYVÄKSYTTY; violetti puu = Googlen 3D-puu (purppurapyökki), PT: ei korjata.
  Lontoon kehityskaupunkinosto voi edetä (Valoseppä).
- Juna 190:ssa jo: Ateena v4 + metrolinja 47c188e37 + korostus rinteessä (NS merge 91e9bdf0f).

## 3. TÄNÄÄN OPITTUA / MUUT
- Ämpärin tiedostot muuttumattomia: jokainen datamuutos uuteen versiokansioon (ateena v1–v6, praha-v3–v5, Lontoo v3–v5 Valosepällä).
  Ateena v3 jäi käyttämättä (KS tarkensi heti viennin jälkeen).
- Julkaisijan lippu voi käynnistää käännöksen haaran VANHASTA tilasta; siksi ketjuissa merge-base-vahti.
- Valoverho: ruskea kalvo Tuulten tornilla, Kaarlensillalla ym. = korostuksen verho (A/B `opas korostus 0`), ei KaupunkiPuut. Nyt oletuksena pois.
- KaupunkiPuut-kortit (minun kerrokseni) näkyvät tummina pyöreinä latvoina (Tower, Tuulten torni); PT ei ole pyytänyt muutosta.
- NS korjasi todistusajon mykistystarkistuksen (rivi katkesi ä:n kohdalta yli 1000 s:n aikaleimoilla), 585e11f0f.
- App-kopiot: lokit/linssiseppa-app/pallot-testi190b (viimeisin ajo); vanhat poistettu (PT). Levy ~75 Gi.
- tools/gpu-vapaa.sh checkoutissa seuraamaton (ei minun, älä committaa).

## ALOITUSVIESTI SEURAAJALLE
Olet Linssiseppä (Opus, high). Lue CLAUDE.md ja tämä luovutus (git show <sha>:docs/raportit/viesti-linssiseppa-luovutus-20261014-1840.md).
Jatka kohdasta 1: tarkista praha-v5:n vienti Julkaisijalta, käynnistä ajo-pallot-testi3.zsh, pyydä käännös + simu, katso arkki, PT:lle ≤ 3 riviä.
