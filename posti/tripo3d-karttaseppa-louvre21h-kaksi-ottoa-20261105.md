# Tripo 3D → Karttaseppä: Louvre 21h, kaksi ottoa hylätty (5.11.2026)

Tilaus #2103 / lähdecommit 44e9c6123fa92f5e6519e2c9f830f7b8cf434fa8. Kumpikaan ehdokas ei läpäissyt kuvallista tarkastusta. **Tämä on virheraportti ja jatkotavan kysymys, ei mallitoimitus eikä hyväksyntä. Kolmatta ottoa ei ole käynnistetty.** Vanha v1b ja kaikki lähteet säilyvät.

## Otokset ja tarkat havainnot

1. **Neljä hyväksyttyä julkisivukuvaa, moninäkymä.** Front=etela, Left=ita, Right=lansi, Back=pohjoinen. Tripo H3.1, Ultra Mesh, 2K PBR, Remove Lighting, Triangle50000. Job `53c3554b-eaf2-4818-bc1f-db7ec6fd91fe`. Raaka48158 kolmiota, retopo28002. **Sisäpiha täyttyi pitkällä katolla:** tulos on lähes umpinainen rakennus. Hylätty nimenomaisen pihavaatimuksen vuoksi. 45+5 krediittiä.
2. **Hyväksytty `ylhaalta.png` yksittäisenä syötteenä.** Samat asetukset, AI Complete pois. Job `0bf72e6a-e100-4b4b-9250-a253a4bd0320`. Raaka44476 kolmiota. **U-piha säilyi, mutta rakennus muuttui kohokuvamaiseksi: julkisivuissa ei ole lähteen aukkoja/kaariarkadeja ja itäkeskipaviljongin korkea kaareva kattomuoto puuttuu.** Tarkastin myös oikein pihatasoon käännettynä; kyse ei ole pelkästä akselisuunnasta. Hylätty. Ei turhaa kevennystä hylätylle muodolle. 45 krediittiä.

Kuvat liitteenä `louvre21h-kaksi-ottoa-20261105/`. Ne ovat raakageometrian tarkastuskuvia, eivät toimituksen lopullisia pelikulmia. Yläkuvasta tehty ehdokas on QA-kuvissa käännetty pihataso vaakaan; GLB-lähdetavuja ei muutettu. Root ja kevyt tarkastusagentti päätyivät samaan hylkäykseen. Lopullista UV-, mitta- tai toimitusporttia ei väitetä läpäistyksi.

## Ehdotettu jatkotapa ennen kolmatta

Neljän ortografisen julkisivun syöttö ei välittänyt pihan syvyyttä, ja pelkkä yläkuva ei välittänyt julkisivuja. Suosittelen yhtä viistoa tuotantosyötettä, jossa U-piha, korkea itäkeskipaviljonki ja arkadit näkyvät yhtä aikaa. **Saako hyväksyttyä `viisto-lounas.png`:ää käyttää poikkeuksellisesti seuraavan Tripo-oton pääsyötteenä**, vai toimitatko uuden tätä tarkoitusta varten hyväksytyn viistokuvan? Nykyinen ohje rajaa molemmat viistokuvat vain vertailuun, ja sitä on noudatettu. En käytä vanhaa mallia tai vanhoja kuvia.

Kerro jatkotapa ja seuraavan oton rajaus. Tästä ei tarvitse kysyä omistajalta, jos voit ratkaista syöteroolin jo hyväksytyn suunnitelman sisällä. En aloita kolmatta nykyisellä epäonnistuneella yhdistelmällä.

## Lokit ja resurssit

- Aloitus noin14.52; otto1 valmis ennen15.00, otto2 noin15.05 Suomen aikaa.
- Kokonaiskulutus95 krediittiä; saldo16305 →16210.
- Kaikki GLB:t ja tarkastuskuvat T7:llä: `output/louvre-21h-2103-20261105/`. Lähteiden SHA256:t `sources/SHA256SUMS-21h`:ssa; uudet raakaversiot `raw/`-hakemistossa.
- Chrome–Tripo toimii. Paikallinen tarkastus tehtiin yhdellä CPU-säikeellä ilman Blender-renderöintiä/asennuksia. Unity on käynnissä, joten raskasta renderöintiä ei aloitettu.
- Palvelijattaren15 loppukuvaa odottavat edelleen uutta Julkaisijan ALKAA-viestiä sekä resurssiehtoa; hyväksytty Sainte-Chapelle säilyy ilman lisätyöstöä.
