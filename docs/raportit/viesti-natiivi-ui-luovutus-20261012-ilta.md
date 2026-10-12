# Natiivi-UI: luovutus 12.10.2026 ilta (tilinvaihto, PT 19.3x)

Edellinen: viesti-natiivi-ui-luovutus-20261012-paiva.md (päivän työt ja säännöt). Pysyvät säännöt: viesti-natiivi-ui-luovutus-20261010-aamu.md.
Ajoskriptit (kopio, käytä tätä): /Users/Shared/Claude/proto-3d/lokit/natiivi-ui-ajoskriptit-20261012 (alkuperäinen scratchpad 034a15d9…; skriptit viittaavat S=${0:A:h}, joten ne toimivat kopiosta; pari.py-polut kovakoodattuja vain iss-ajo/linnakuulto-skripteissä)
(iss-ajo.sh + sk-iss*/sk-issvinkki*, napitkuulto-ajo.sh = yleinen ajo HAARA/APPDIR/SKEN-ympäristöllä, yhd184-ketju.sh, pk2-ketju.sh,
iss3-ketju.sh, sk-yhd184*, sk-pallokisa2*, sk-kaiutin*, sk-raha*, pari.py / yksi.py = merkityt täysikokoiset kuvat).

## SÄÄNNÖT (lisäys 12.10.)
- VAATII TOIMIA → Asemataulu (ArtifactData talo/toimi-natiivi-ui), hoidettu → delete.
- Kuvat omistajalle täysikokoisina, merkittyinä (NYKYINEN | UUSI, laite, kaupunki, nro, SHA). Pelkkä arkki vain PT:lle.
- Ei lupakyselyjä: ei rm-globeja, ei python-/stdin-heredocia komentoriviltä, ei pitkiä ketjuja → skripti tiedostoon (Write) ja aja.
- Käännös/simu vain Julkaisijan KÄÄNNÖS NYT / SIMU NYT; swap-raja: simut peräkkäin, kun Julkaisija sanoo. LUKKO VAPAA / SIMU VAPAA aina.
- Levy: käännökset kaatuvat < 25 Gt. Poista omat puhtaat worktreet (git -C …/Matkakirja-proto worktree remove, web tools/uusi-worktree.sh --poista).

## TILA 19.3x — kaikki junaan 184 (juna-184:n päällä, ellei toisin mainita)
| Erä | Haara · SHA | Tila |
|---|---|---|
| ISS-ohjaamon jumi | natiivi-ui/iss-jumi-184 3757d0760 (käännös 516bb285a) | Simuajot käynnissä 19.13 (sk-issvinkki: vinkki, napautus NÄKYVÄÄN Puluun 0.89/0.69 iPhone, 0.89/0.76 iPad, tap pulu-kosketus, taulu → Poistu). JUURISYY: Pulun kosketusalue jäi lepopaikalle robottikädessä → nyt kypärän päällä (LiviaKuva.KyparaPiste). Omistaja: EI ☰:tä, Pulu on poistumistie; kertavinkki "Napauta Pulua palataksesi". PT ei vielä kuitannut. |
| Pallokisa | pelikoodari/pallokisa-184 7ed08d802 (sis. NUI 0c46f9776) | Jonossa Julkaisijalla (pk2-ketju.sh). Tulostaulu aarrelaskurin paikalle; hehku "pito" kuviin. |
| Yhdistelmä | natiiviseppa/apuraha-184b 971b8d64d (NS, sis. natiivi-ui/kehittaja-184 94c6095da) + natiivi-ui/mac-vieritys-184 d894ca762 + natiivi-ui/lehtinostot-184 af860a109 + natiivi-ui/kaiutin-tauko-184 3e46439a2 + natiivi-ui/raha-animaatio-184 dc05200b4 | Jonossa (yhd184-ketju.sh, app lokit/natiivi-ui-app-yhd184; NS ajaa apurahatodisteensa samalla apilla). sk-yhd184: pelaaja \| kehittäjä, Takaisin, ui mac unityrulla, ui kohdekartta nayta, kaiutin keskeytettynä; SKEN=raha jälkeen-video. |
| Kehittäjätila + ansaitut | natiivi-ui/kehittaja-184 94c6095da | PT hyväksyi a–d. Takaisin avaajaan (AvaaNakymaan), kehittäjäkoodilla kaikki linssit, pelaajalle ei keskeneräisiä (Saatavilla/Julkaistu), keskeneräinen ansaittu → hiljaa + kortti julkaisussa (UiNakymat.UusiLinssi), dev-Pelit: Pallokisa (KehittajaKoe), Katso ja löydä, ISS-raketti. NS:n testaajatila ja Valmiit && !Kesken haarassa apuraha-184b. Houkuttimet saavat jäädä (vain väripiste). |
| Mac-vieritys | natiivi-ui/mac-vieritys-184 d894ca762 | Unityn ScrollView-rulla hiljennetään Macilla (MacSyote.UnityListaRullaPois), MacSyote vierittää 1:1. Todiste simusta (pt/napsu); oikea Mac-mittaus vain kun omistaja ei käytä konetta. |
| Kaupunkilehden nostot | web ravelius/Matkakirja#4522 d7300dfed (luonnos, #4518:n päällä, EI MERGEÄ ennen julkaisupyyntöä); proto natiivi-ui/lehtinostot-184 af860a109 | Data valmis (14 sivua, 34 nostoa, wiki-linkki SK #4524:stä). Natiivi: Näytä kartalla (Kohdekartan.AvaaKohde). Natiivin lehtitodiste vasta paketin viennin jälkeen. |
| Kaiutin keskeytettynä | natiivi-ui/kaiutin-tauko-184 3e46439a2 | Ei vilkkua: himmeä kaiutin + Ikonit.Tauko (KortinLukija). Ennen-kuva ISS-apilla (SKEN=sk-kaiutin). |
| Rahan tulo | natiivi-ui/raha-animaatio-184 dc05200b4 | Kolikot kaarena summaan + rullaus + coin, ~2,4 s. Video+ääni ennen (ISS-appi) \| jälkeen (yhdistelmä). |
| Codex-kuvaketilaus | claude/postilaatikko 23a88ef42 | 24 kuvaketta (kaasu, pallo, lippu, ajastin …). Kun Codex toimittaa → Ikonit.Viiva + kaasumittarin tankki. |
| Läpinäkyvät napit | natiivi-ui/napit-kuulto-184 439ce04a2 (juna-183-pohja), linna KUITATTU (linnahaarassa 3f178beb2) | Oletus-osan kuvat vielä ottamatta (napitkuulto-ajo.sh SKEN=napitkuulto). |
| Pienet (juna-183-pohja) | natiivi-ui/pienet-184 75d0b70ff | Kippi Poistu-vahvistus, raketin hintalapun alirivi + ISS-kertavinkki Pulun kuplana (7 s). |
| Muut odottavat | kysymys-paalle-184 d84cd1552, retkikunta-jaa-184 a7d52190c, kaasumittari-184 0c46f9776, aarre-kartta-184 559496447 (Pelikoodarilla), taidehalli-vaaka-183 f7363c7c2 (asettelutesti jonossa), intro c0e04260c + metro ef1bc2818 (PT:llä kuvat) | |

## SEURAAVAT ASKELEET
1. ISS-ajojen tulos (lokit/todistus-iss-uusi-*): onko "Minne katsotaan" auennut näkyvästä Pulusta → kuvat (iss-kuvat.sh) → PT.
2. Pallokisa ja yhdistelmä Julkaisijan NYT-viestillä (ketjut valmiina) → kuvat PT:lle: pelaaja | kehittäjä, Mac pt/napsu, Näytä kartalla, kaiutin, raha-video (mux wav + mp4).
3. Kuittausten jälkeen SHA:t Natiivisepälle junaan 184 (yksi rivi per erä).
