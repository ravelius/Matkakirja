/*
 * REITTIEN RINNAKKAISKARSINTA — sama korridori piirretään kerran.
 *
 * === MIKSI (omistaja 1.9.2026, kuvakaappaus Italiasta) ==============
 *
 * Sanatarkasti: *"Laivareittejä näyttää menemään liikaa."* Kaappauksessa
 * Sisilian eteläpuolella kulkee neljä lähes yhdensuuntaista kaarta, ja
 * MITATTU SYY EI OLE KAKSOISDATA vaan pelilaudan oma verkko:
 *
 *   sisilia|ateena   kiertää Sisilian länsi- ja eteläpuolitse
 *   kreeta|sisilia   kiertää saman mutkan samaa uraa
 *   dubrovnik|rooma  kiertää koko saappaan JA Sisilian samaa uraa
 *   rooma|sisilia    tulee Tyrrhenanmeren yli samaan solmuun
 *
 * Kaupunkipareja on 408 ja jokainen esiintyy TASAN KERRAN (mitattu:
 * ei yhtään kaksoiskaarta). Karsintaa on KAHTA LAJIA, molemmat vain
 * kuvasta — verkko itse jää koskemattomaksi:
 *
 *   KOKO REITIN PUDOTUS  reitti, joka kulkee valtaosin toisen urassa,
 *                        jätetään piirtämättä kokonaan (omistaja
 *                        1.9.2026: "Samansuuntaisia matkoja pitäisi
 *                        aina olla vain yksi"; ks. URASADE).
 *   OSUUSKARSINTA        muilta se stretch, jonka toinen reitti jo
 *                        piirtää AIVAN vierestä, jätetään piirtämättä.
 *   OSUUSYHDISTÄMINEN    pitkä rinnakkaisjakso leveämmässä
 *                        korridorissa piirtyy vain pidemmän reitin
 *                        viivana, ja lyhyemmän piirtyvä pää LIITETÄÄN
 *                        pitkän viivaan lyhyellä liittymäsillalla
 *                        (omistaja 1.9.2026 ilta, sanatarkasti:
 *                        "aina kun kaksi laivareittiä kulkee lähellä
 *                        toisiaan niin ne pitää yhdistää siltä osin
 *                        yhdeksi reitiksi. ne voivat sitten taas
 *                        erkaantua tarvittaessa myöhemmin reitillä").
 *
 * === TÄMÄ EI KOSKE PELIMOOTTORIA ===================================
 *
 * Karsinta muuttaa VAIN sitä, mitä laattaan poltetaan. `edge.poly`,
 * askelmien paikat ja pelin kävelemä käyrä ovat entiset — nappula
 * kulkee yhä koko reitin, ja pelitilan elävä kerros piirtää sen.
 * Tämä moduuli saa syötteenä pelkkiä murtoviivoja laudan yksiköissä
 * eikä tunne kaupunkeja, matkustustapoja eikä pelin sääntöjä.
 *
 * === SÄÄNTÖ ON MITATTU JA DETERMINISTINEN ==========================
 *
 * Järjestys on PITUUS LASKEVASTI ja tasapelissä tunnus — ei siis
 * mitään arvottua eikä syötteen järjestykseen sidottua. Pisin reitti
 * piirtyy aina kokonaisena, ja lyhyempi väistää sen. Sama syöte antaa
 * saman tuloksen joka ajolla ja joka laatalla; laatta ei näy tänne
 * lainkaan, joten laattaraja ei voi katkaista viivaa (sama sääntö
 * kuin katkokuvion vaiheella, maailmapiirto.js).
 *
 * Neljä lukua, ja jokaisella on mitattu peruste (lautayksikkö on
 * päiväntasaajalla noin 3,34 km):
 *
 *   ETAISYYS 16   53 km. Alaraja tulee siitä, että 8 yksikköä (27 km)
 *                 jätti Sisilian nipun kolmeksi viivaksi; yläraja
 *                 siitä, että 20 yksikköä alkoi niputtaa Egeanmeren
 *                 saaristoreittejä, jotka ovat oikeasti eri väyliä.
 *   KULMA 30°     rinnakkaisuus, ei risteys. Ilman kulmaehtoa jokainen
 *                 ristikkäin menevä reitti katkaisisi toisen.
 *   VAHIN 40      134 km. Lyhyempi peitto jätetään piirtoon: muuten
 *                 viivaan tulisi rokonarpia joka risteyksestä.
 *   TYNGAT 20     67 km. Reitin ensimmäiset ja viimeiset yksiköt
 *                 piirretään AINA. Kaupungista on lähdettävä näkyvä
 *                 viiva, tai lyhyt rinnakkainen reitti (esim.
 *                 tanger|fes pitkän tanger|ahaggarin vieressä)
 *                 näyttäisi siltä, ettei kaupunkiin tule tietä.
 */

/** Karsinnan mitat lautayksikköinä. Vapaana oliona, jotta koe voi mitata. */
export const KARSINTA = Object.freeze({
  /*
   * Omistaja 1.9.2026: 16 yksikön (53 km) säde jätti karsittuun reittiin
   * silmin nähtävän aukon keskelle merta ("Osa laivareiteistä jännästi
   * katkeaa välissä") — korvaava viiva oli liian kaukana ollakseen
   * silmälle sama ura. Karsitaan vain se, mikä kulkee AIDOSTI samassa
   * urassa: 5 yksikköä (~17 km) on z6:lla 18 px eli parin viivanleveyden
   * päässä.
   */
  etaisyys: 5,    // kuinka lähelle toista reittiä saa tulla
  kulma: 30,      // asteina: rinnakkaisuuden raja
  vahin: 60,      // lyhyempää peittoa ei karsita
  tyngat: 20,     // reitin päistä aina piirtyvä osuus
  /*
   * KOKO REITIN PUDOTUS (omistaja 1.9.2026, sanatarkasti):
   * *"laivamatkoja menee hieman päällekkäin. Samansuuntaisia matkoja
   * pitäisi aina olla vain yksi. Ei haittaa, jos pistetiheys muuttuu
   * suuntaan tai toiseen."* ja *"varsinkin jos on jollain alueella
   * paljon enemmän viivoja ja pisteitä, niin niitä saa silloin
   * tavalla tai toisella karsia."* Osuuskarsinta jättää rinnakkaisen
   * reitin PÄÄT näkyviin, ja juuri ne näyttävät päällekkäisiltä
   * matkoilta — siksi reitti, joka kulkee valtaosin toisen urassa,
   * pudotetaan kuvasta KOKONAAN. Sama sääntö koskee maa- ja
   * meriteitä; omistaja nimesi molemmat visuaalisen ilmeen asiaksi
   * ("enemmän visuaalista herkkua kuin oikeasti pelissä tärkeitä").
   * Peli kävelee reitin yhä — pudotus koskee vain poltettua kuvaa,
   * ja elävä kerros piirtää valitun matkan aina.
   *
   *   URASADE 16        53 km — sama korridori, jolla Sisilian nippu
   *                     alun perin mitattiin neljäksi rinnakkaiseksi.
   *   URAPEITTO 0,9     pituusosuus PIIRRETYSSÄ musteessa, josta
   *                     pudotus alkaa. Oli 0,4/0,6 — ja se oli
   *                     MITATTU VIRHE: pudotus ei jätä tynkää eikä
   *                     siltaa, joten peittämätön osa on kuvassa
   *                     REIKÄ. Etsintäparvi 1.9.2026 löysi viisi:
   *                     dublin|edinburgh (peitto 45 %) katosi ja
   *                     keskelle Pohjanmerta jäi tyhjä käytävä,
   *                     kreeta|sisilia (86 %) katosi ja Kreetan
   *                     solmuun ei tullut ainuttakaan kunnon viivaa
   *                     eikä Rooman eteläpuolen käytävään mustetta.
   *                     Koko reitin saa pudottaa vain, jos LÄHES
   *                     KAIKKI siitä on aidosti toisen piirretyssä
   *                     urassa; osittaiset päällekkäisyydet hoitaa
   *                     OSUUSYHDISTÄMINEN tyngillä ja silloilla.
   *
   * PEITTO MITATAAN PIIRRETYSTÄ MUSTEESTA, EI VERKOSTA (etsintä-
   * parven juurisyy 1.9.2026): vanha kaksivaiheinen karsinta mittasi
   * pudotuksen peiton koko verkon murtoviivoista, ja peittäjä saattoi
   * itse olla karsittu samasta kohdasta — reikä syntyi kahden
   * päätöksen summana. Nyt pudotus ratkaistaan samassa pituus-
   * järjestyksessä kuin muukin karsinta ja peittoon kelpaa vain jana,
   * joka on jo lopullisesti piirretty.
   *
   * KAKSI VARTIJAA:
   *
   *   URAVAHIN 200  670 km. Lyhyempää reittiä ei pudoteta koskaan:
   *                 lyhyt hyppy pitkän reitin varjossa on oma
   *                 paikallisyhteytensä (helsinki|tallinna jäi
   *                 mitatusti tukholman-uran alle), ei rinnakkainen
   *                 valtamerimatka.
   *   ASTE >= 2     reitti pudotetaan vain, jos kummankin pään
   *                 solmusta lähtee verkossa vähintään kaksi
   *                 reittiä — kaupunki ei saa jäädä kuvassa
   *                 irralleen. Aste lasketaan KOKO verkosta eikä
   *                 käsittelyjärjestyksestä, jotta pitkäkin
   *                 rinnakkainen voi pudota.
   */
  uraSade: 16,        // koko reitin pudotuksen korridori
  uraPeitto: 0.9,     // pituusosuus piirretyssä urassa, josta pudotus alkaa
  uraVahin: 200,      // lyhyempää reittiä ei pudoteta koskaan
  /*
   * OSUUSYHDISTÄMINEN (omistaja 1.9.2026 ilta, sanatarkasti):
   * *"aina kun kaksi laivareittiä kulkee lähellä toisiaan niin ne
   * pitää yhdistää siltä osin yhdeksi reitiksi. ne voivat sitten
   * taas erkaantua tarvittaessa myöhemmin reitillä"* — ja saman
   * päivän kuvasta: *"alemmassa esimerkkikuvassa näkyy edelleen
   * yhteneviä linjoja, jotka pitää yhdistää"*. Mitattu syyllinen
   * (Japanin ikkuna): sahalin|tokio ja tokio|sanfrancisco kulkevat
   * 20–50 yksikön päässä toisistaan — liian kaukana osuuskarsinnan
   * 5 yksikölle, liian pienellä peitolla koko reitin pudotukselle.
   *
   * Siksi kolmas muoto: pitkä YHTENÄINEN rinnakkaisjakso leveällä
   * korridorilla karsitaan osuutena kokonaan, ja jakson rajalle
   * piirretään LIITTYMÄSILTA leikkauspisteestä lähimpään kohtaan
   * peittävällä viivalla, jotta viivat sulautuvat yhteen ja
   * haarautuvat taas erotessa — roikkuva pää kymmenien yksiköiden
   * päässä toisesta viivasta oli juuri se, mistä omistaja valitti
   * (aiemmin myös "Osa laivareiteistä jännästi katkeaa välissä").
   *
   *   LIITOSSADE 40     134 km. Meriteillä; MITATTU Japanin parista:
   *                     sahalin|tokio lähestyy tokio|sanfranciscoa
   *                     tasaisesti, ja 40 yksikön sisällä rinnan
   *                     kulkee 178 yksikköä (24:n sisällä vain 109,
   *                     mikä ei ylitä LIITOSVAHINia — pari jäi
   *                     kuvaan kahtena viivana). Egeanmeren aidosti
   *                     eri väylät erottaa pituusvartija
   *                     (LIITOSVAHIN): saaristossa rinnakkaisjaksot
   *                     ovat lyhyitä.
   *   LIITOSSADEMAA 10  33 km. Maalla kapeampi: 80 km:n päässä
   *                     toisistaan kulkevat tiet ovat oikeasti eri
   *                     teitä, meressä sama väylä on leveämpi.
   *   LIITOSVAHIN 150   500 km. Lyhyempää rinnakkaisjaksoa ei
   *                     yhdistetä: risteävät ja hetkeksi
   *                     lähentyvät reitit saavat pitää viivansa.
   *   LIITOSVAHINSOLMU  334 km. HAARASUU eli jakso, joka alkaa
   *              100     reitin OMASTA PÄÄSTÄ siitä solmusta, johon
   *                     peittävä viiva on jo piirretty, saa
   *                     lyhyemmän vähimmäispituuden. LIITOSVAHIN
   *                     vartioi "hetkeksi lähentyviä" pareja, mutta
   *                     samasta kaupungista lähtevä pari EI lähenny
   *                     hetkeksi: se lähtee etäisyydeltä nolla,
   *                     yhtenä viivana, ja erkanee vasta myöhemmin
   *                     — juuri se tapaus, jonka omistaja kuvasi
   *                     ("ne voivat sitten taas erkaantua
   *                     tarvittaessa myöhemmin reitillä").
   *                     MITATTU (tarkastusparvi 1.9.2026, Länsi-
   *                     Afrikka): dakar|kappalmas ja dakar|
   *                     joaopessoa lähtevät Dakarista yhtenä
   *                     viivana ja kulkevat 106 yksikköä rinnan
   *                     ennen erkanemista — LIITOSVAHIN 150 ei
   *                     ylittynyt, ja kuvaan jäi Dakarista lähtevä
   *                     kaksoisviiva. Koko laudan jaettujen
   *                     solmujen parit jakautuvat kahteen ryhmään:
   *                     15 paria, joiden haarasuu on 106 yksikköä
   *                     tai pidempi, ja loput alle 94 — väli
   *                     94…105 on TYHJÄ. 100 on siis se rako,
   *                     joka erottaa yhtenä viivana lähtevät
   *                     aidosti heti eri suuntiin haarautuvista
   *                     (helsinki|tallinna 85, tanger|fes 49).
   *                     Lyhyt paikallishyppy on silti suojassa:
   *                     haarasuu vaatii URAVAHIN-mittaisen reitin
   *                     kuten pään syöminenkin (ks. alla).
   *   LIITOSKULMA 50°   väljempi kuin osuuskarsinnan 30°, ja syy on
   *                     MITATTU: sahalin|tokio laskee Tokioon
   *                     30–45 asteen kulmassa tokio|sanfranciscoon
   *                     nähden ja kulkee silti 178 yksikköä sen
   *                     kyljessä — silmälle ne ovat juuri ne
   *                     "yhtenevät linjat". Kohtisuorat risteykset
   *                     jäävät yhä ulkopuolelle, ja loivienkin
   *                     risteysten ohikiitävät lähijaksot karsii
   *                     LIITOSVAHIN.
   *   SILTAVAHIN 6      alle 6 yksikön päässä viivat jo koskevat
   *                     toisiaan silmässä — siltaa ei piirretä.
   *
   * PÄÄN SAA SYÖDÄ VAIN SOLMUUN ASTI: jakso saa ulottua reitin
   * päähän (tynkäkin jää pois) vain, jos samasta päätesolmusta
   * lähtee JO PIIRRETTY viiva — silloin kaupunkiin tulee viiva
   * peittävää reittiä pitkin ja lyhyemmän viiva haarautuu siitä
   * sillalla (sahalin|tokio haarautuu tokio|sanfranciscosta).
   * Muuten tynkä jää, kuten osuuskarsinnassa aina.
   */
  liitosSade: 40,     // yhdistämiskorridori merellä
  liitosSadeMaa: 10,  // yhdistämiskorridori maalla
  liitosVahin: 150,   // lyhyempää rinnakkaisjaksoa ei yhdistetä
  liitosVahinSolmu: 100, // sama haarasuulle: jakso alkaa jaetusta solmusta
  liitosKulma: 50,    // asteina: yhdistämisen rinnakkaisuusraja
  /*
   * PEITTÄVÄN MUSTEEN ON OLTAVA YHTENÄINEN KÄYRÄ (etsintäparvi
   * 1.9.2026, Karibia): miami|havanna "peittyi" kolmen ERI viivan
   * tilkkutäkillä — Miamin päässä neworleans|miami, keskellä
   * havanna|sanjuan (jopa 35 yksikön päässä), Havannan päässä
   * havanna|merida — ja katosi kuvasta, vaikka mikään yksittäinen
   * viiva ei kulje Miamin ja Havannan väliä. Silmälle korvaava
   * viiva on olemassa vain, jos peittävä muste jatkuu käyränä:
   * siksi jakso katkaistaan kohdassa, jossa lähin peittävä piste
   * HYPPÄÄ yli LIITOSHYPYN — saman kanavan viivanvaihto (kreeta|
   * sisilian peittäjä vaihtuu sisilia|ateenasta dubrovnik|roomaan
   * muutaman yksikön päässä) mahtuu rajaan, kaukaisen ristikkäis-
   * viivan varaan jakso ei jää.
   */
  liitosHyppy: 15,    // suurin peittävän musteen hyppäys jakson sisällä
  siltaVahin: 6,      // tätä lähempänä siltaa ei tarvita
});

/** Murtoviivan pituus laudan yksiköissä. */
function pituus(poly) {
  let L = 0;
  for (let i = 1; i < poly.length; i += 1) {
    L += Math.hypot(poly[i][0] - poly[i - 1][0], poly[i][1] - poly[i - 1][1]);
  }
  return L;
}

/**
 * Jo piirrettyjen janojen ruudukkohakemisto.
 *
 * Ilman hakemistoa tämä olisi 408 reittiä × 127 pistettä × kaikki
 * janat = kymmeniä miljoonia vertailuja ja minuutteja; ruudukolla se
 * on sekunnin murto-osa. Ruudun sivu on karsintaetäisyys, joten
 * pisteen naapurusto on 3 × 3 ruutua.
 */
class Hakemisto {
  constructor(ruutu) {
    this.ruutu = ruutu;
    this.solut = new Map();
  }

  lisaa(ax, ay, bx, by) {
    const jana = [ax, ay, bx, by];
    const s0 = Math.floor(Math.min(ax, bx) / this.ruutu);
    const s1 = Math.floor(Math.max(ax, bx) / this.ruutu);
    const r0 = Math.floor(Math.min(ay, by) / this.ruutu);
    const r1 = Math.floor(Math.max(ay, by) / this.ruutu);
    for (let r = r0; r <= r1; r += 1) {
      for (let s = s0; s <= s1; s += 1) {
        const avain = `${s}:${r}`;
        let lista = this.solut.get(avain);
        if (!lista) { lista = []; this.solut.set(avain, lista); }
        lista.push(jana);
      }
    }
  }

  /** Onko pisteessä (x,y) suuntaan (ux,uy) kulkeva jana lähellä? */
  peitossa(x, y, ux, uy, etaisyys, cosRaja) {
    const s0 = Math.floor((x - etaisyys) / this.ruutu);
    const s1 = Math.floor((x + etaisyys) / this.ruutu);
    const r0 = Math.floor((y - etaisyys) / this.ruutu);
    const r1 = Math.floor((y + etaisyys) / this.ruutu);
    for (let r = r0; r <= r1; r += 1) {
      for (let s = s0; s <= s1; s += 1) {
        const lista = this.solut.get(`${s}:${r}`);
        if (!lista) continue;
        for (const [ax, ay, bx, by] of lista) {
          const vx = bx - ax;
          const vy = by - ay;
          const L2 = vx * vx + vy * vy;
          let t = L2 ? ((x - ax) * vx + (y - ay) * vy) / L2 : 0;
          t = t < 0 ? 0 : (t > 1 ? 1 : t);
          const d = Math.hypot(x - (ax + vx * t), y - (ay + vy * t));
          if (d > etaisyys) continue;
          const L = Math.sqrt(L2) || 1;
          const c = Math.abs((vx / L) * ux + (vy / L) * uy);
          if (c >= cosRaja) return true;
        }
      }
    }
    return false;
  }

  /**
   * Lähin SUUNTAAN (ux,uy) kulkeva kohta hakemiston janoilla
   * pisteestä (x,y), enintään `etaisyys` päästä. Sama ehto kuin
   * peitossa-metodissa, mutta palauttaa lähimmän kelvollisen
   * kohdan: osuusyhdistäminen tarvitsee peittävän musteen PAIKAN,
   * jotta jakso voidaan katkaista siihen, missä peittävä käyrä
   * vaihtuu toiseksi kaukana kulkevaksi viivaksi (ks. LIITOSHYPPY).
   *
   * @returns {{d:number, x:number, y:number}|null}
   */
  lahinSuuntainen(x, y, ux, uy, etaisyys, cosRaja) {
    const s0 = Math.floor((x - etaisyys) / this.ruutu);
    const s1 = Math.floor((x + etaisyys) / this.ruutu);
    const r0 = Math.floor((y - etaisyys) / this.ruutu);
    const r1 = Math.floor((y + etaisyys) / this.ruutu);
    let paras = null;
    for (let r = r0; r <= r1; r += 1) {
      for (let s = s0; s <= s1; s += 1) {
        const lista = this.solut.get(`${s}:${r}`);
        if (!lista) continue;
        for (const [ax, ay, bx, by] of lista) {
          const vx = bx - ax;
          const vy = by - ay;
          const L2 = vx * vx + vy * vy;
          let t = L2 ? ((x - ax) * vx + (y - ay) * vy) / L2 : 0;
          t = t < 0 ? 0 : (t > 1 ? 1 : t);
          const px = ax + vx * t;
          const py = ay + vy * t;
          const d = Math.hypot(x - px, y - py);
          if (d > etaisyys || (paras && d >= paras.d)) continue;
          const L = Math.sqrt(L2) || 1;
          if (Math.abs((vx / L) * ux + (vy / L) * uy) >= cosRaja) paras = { d, x: px, y: py };
        }
      }
    }
    return paras;
  }

  /**
   * Lähin kohta hakemiston janoilla pisteestä (x,y), enintään
   * `etaisyys` yksikön päästä. Liittymäsillan maali: suuntaehtoa ei
   * ole, koska silta nimenomaan YLITTÄÄ viivojen välin eikä kulje
   * niiden suuntaan.
   *
   * @returns {{d:number, x:number, y:number}|null}
   */
  lahin(x, y, etaisyys) {
    const s0 = Math.floor((x - etaisyys) / this.ruutu);
    const s1 = Math.floor((x + etaisyys) / this.ruutu);
    const r0 = Math.floor((y - etaisyys) / this.ruutu);
    const r1 = Math.floor((y + etaisyys) / this.ruutu);
    let paras = null;
    for (let r = r0; r <= r1; r += 1) {
      for (let s = s0; s <= s1; s += 1) {
        const lista = this.solut.get(`${s}:${r}`);
        if (!lista) continue;
        for (const [ax, ay, bx, by] of lista) {
          const vx = bx - ax;
          const vy = by - ay;
          const L2 = vx * vx + vy * vy;
          let t = L2 ? ((x - ax) * vx + (y - ay) * vy) / L2 : 0;
          t = t < 0 ? 0 : (t > 1 ? 1 : t);
          const px = ax + vx * t;
          const py = ay + vy * t;
          const d = Math.hypot(x - px, y - py);
          if (d <= etaisyys && (!paras || d < paras.d)) paras = { d, x: px, y: py };
        }
      }
    }
    return paras;
  }
}

/**
 * Merkitsee jokaiselle reitille ne murtoviivan välit, jotka poltetaan.
 *
 * Reitit muuttuvat paikallaan: jokainen saa kentät
 *   `piirtoValit`  [[i0,i1], …] piirrettävät indeksivälit (tyhjä =
 *                  reitti ei piirry lainkaan; koko reitti = [[0, n-1]])
 *   `askelmat`     karsitut askelhelmet (piirtoväleillä olevat)
 *   `liittymat`    liittymäsillat [[x0,y0,x1,y1], …] laudan
 *                  yksiköissä: leikkausrajan piirtyvästä päästä
 *                  lähimpään kohtaan peittävällä viivalla (piirtää
 *                  maailmapiirto.js samalla katkotyylillä)
 * ja alkuperäiset `poly`, `solmut`, `siemen` jäävät koskematta.
 *
 * @param {Array<{poly:Array<[number,number]>, askelmat?:Array}>} reitit
 * @param {object} [asetukset] KARSINNAN osittainen korvaus (koetta varten)
 * @returns {{reitteja:number, pudotettuja:number, katkottuja:number,
 *            yhdistettyja:number, liittymia:number,
 *            pituus:number, karsittu:number, askelmat:number,
 *            karsitutAskelmat:number}}
 */
export function karsiRinnakkaiset(reitit, asetukset = null) {
  const M = asetukset ? { ...KARSINTA, ...asetukset } : KARSINTA;
  const cosRaja = Math.cos((M.kulma * Math.PI) / 180);
  const cosLiitos = Math.cos((M.liitosKulma * Math.PI) / 180);
  const hakemisto = new Hakemisto(Math.max(1, M.etaisyys));
  /*
   * JÄRJESTYS EI SAA TULLA SYÖTTEEN JÄRJESTYKSESTÄ. Pituus ratkaisee,
   * ja tasapelin ratkaisee reitin oma tunnusluku (`siemen`, sama joka
   * antaa kynänpaineen ja katkokuvion) ja viimeisenä sen ensimmäinen
   * piste. Jos tasapeli ratkeaisi listan indeksillä, sama lauta eri
   * järjestyksessä antaisi eri kuvan.
   */
  const jarjestys = reitit
    .map((r) => ({ r, L: pituus(r.poly) }))
    .sort((a, b) => (b.L - a.L)
      || ((a.r.siemen ?? 0) - (b.r.siemen ?? 0))
      || (a.r.poly[0][0] - b.r.poly[0][0])
      || (a.r.poly[0][1] - b.r.poly[0][1]));

  const tilasto = {
    reitteja: reitit.length,
    pudotettuja: 0,
    katkottuja: 0,
    yhdistettyja: 0,
    liittymia: 0,
    pituus: 0,
    karsittu: 0,
    askelmat: 0,
    karsitutAskelmat: 0,
  };

  const solmuAvain = (p) => `${p[0].toFixed(2)}:${p[1].toFixed(2)}`;
  /* Solmun aste KOKO verkosta: pudotus ei saa jättää kaupunkia irti. */
  const aste = new Map();
  for (const r of reitit) {
    for (const avain of [solmuAvain(r.poly[0]), solmuAvain(r.poly[r.poly.length - 1])]) {
      aste.set(avain, (aste.get(avain) ?? 0) + 1);
    }
  }
  /*
   * Osuusyhdistämisen oma hakemisto (leveämpi ruutu) ja jo piirretyt
   * päätesolmut. Kumpaankin pannaan vain PIIRTYVÄT osuudet, joten
   * myöhempi reitti ei voi yhtyä viivaan, jota ei kuvassa ole —
   * sama sääntö koskee myös koko reitin pudotusta (ks. URAPEITTO):
   * yksi läpikäynti pituusjärjestyksessä, ja jokainen päätös nojaa
   * vain jo lopullisesti piirrettyyn musteeseen.
   */
  const liitosHakemisto = new Hakemisto(Math.max(1, M.liitosSade));
  const piirretytPaat = new Set();

  for (const { r, L } of jarjestys) {
    tilasto.pituus += L;
    const poly = r.poly;
    const n = poly.length;
    const liitosSade = r.laji === 'meri' ? M.liitosSade : M.liitosSadeMaa;
    /* Kaarenpituus pisteittäin: tyngät ja vähimmäispituus mitataan siitä. */
    const s = new Float64Array(n);
    for (let i = 1; i < n; i += 1) {
      s[i] = s[i - 1] + Math.hypot(poly[i][0] - poly[i - 1][0], poly[i][1] - poly[i - 1][1]);
    }
    /*
     * SUUNTA LIUKUVALLA KAARI-IKKUNALLA, EI NAAPURIPISTEISTÄ.
     * Merireitin murtoviivassa on koristeellista mutkittelua
     * (aallonpituus ~40 yksikköä), ja naapuripisteistä laskettu
     * suunta heittelee MITATUSTI ±30° — rinnakkaisuusehto katkeili
     * silloin joka mutkassa, ja sahalin|tokion 178 yksikön
     * rinnakkaisjakso tokio|sanfranciscon vieressä hajosi alle 10
     * yksikön pätkiksi, joita LIITOSVAHIN ei koskaan ylitä. 16
     * yksikön ikkuna kumpaankin suuntaan painaa heiton mitatusti
     * ±5°:een; risteävä reitti on silloinkin yhä risteävä, koska
     * ikkuna on lyhyt reittien mittakaavassa.
     */
    const IKKUNA = 16;
    const ux = new Float64Array(n);
    const uy = new Float64Array(n);
    for (let i = 0; i < n; i += 1) {
      let ia = i;
      let ib = i;
      while (ia > 0 && s[i] - s[ia] < IKKUNA) ia -= 1;
      while (ib < n - 1 && s[ib] - s[i] < IKKUNA) ib += 1;
      const vx = poly[ib][0] - poly[ia][0];
      const vy = poly[ib][1] - poly[ia][1];
      const ul = Math.hypot(vx, vy) || 1;
      ux[i] = vx / ul;
      uy[i] = vy / ul;
    }
    /*
     * === KOKO REITIN PUDOTUS (ks. URASADE/URAPEITTO) ===============
     *
     * Pisin reitti pysyy aina; lyhyempi, joka kulkee LÄHES KOKONAAN
     * jo piirretyssä urassa, putoaa kuvasta. Peittoon kelpaa vain
     * piirretty muste (etsintäparven juurisyy: peittäjä saattoi itse
     * olla karsittu samasta kohdasta, ja kuvaan syntyi reikä).
     */
    if (L >= M.uraVahin
      && (aste.get(solmuAvain(poly[0])) ?? 0) >= 2
      && (aste.get(solmuAvain(poly[n - 1])) ?? 0) >= 2) {
      let peitto = 0;
      for (let i = 1; i < n; i += 1) {
        // Näytteet janan välein, ei vain kärjistä (ks. NÄYTTEIN alla).
        const jana = s[i] - s[i - 1];
        const naytteita = Math.max(1, Math.ceil(jana / 8));
        for (let m = 0; m < naytteita; m += 1) {
          const t = (m + 0.5) / naytteita;
          const x = poly[i - 1][0] + (poly[i][0] - poly[i - 1][0]) * t;
          const y = poly[i - 1][1] + (poly[i][1] - poly[i - 1][1]) * t;
          const k = t < 0.5 ? i - 1 : i;
          if (hakemisto.peitossa(x, y, ux[k], uy[k], M.uraSade, cosRaja)) {
            peitto += jana / naytteita;
          }
        }
      }
      if (peitto / L >= M.uraPeitto) {
        r.piirtoValit = [];
        r.liittymat = [];
        if (r.askelmat?.length) {
          tilasto.askelmat += r.askelmat.length;
          tilasto.karsitutAskelmat += r.askelmat.length;
          r.askelmat = [];
        }
        tilasto.pudotettuja += 1;
        tilasto.karsittu += L;
        continue;
      }
    }
    /*
     * === PEITTO MITATAAN JANOITTAIN, NÄYTTEIN =====================
     *
     * Maski on JANAKOHTAINEN (jana i on poly[i-1] -> poly[i]), ja
     * jokainen jana mitataan enintään kahdeksan yksikön välein
     * otetuin näyttein. Kärkipisteet eivät riitä: harvaan
     * pisteytetyllä reitillä (sanfrancisco|hawaii on KAKSI pistettä
     * ja 1310 yksikköä) pelkkä kärkien peitto väitti koko välin
     * peitetyksi, vaikka keskellä ei ollut mustetta — etsintäparven
     * löydösten juurisyitä. Jana peittyy vain, jos SEN JOKAINEN
     * näyte peittyy — ja leveässä korridorissa lisäksi vain, jos
     * peittävä muste jatkuu käyränä näytteestä seuraavaan (ks.
     * LIITOSHYPPY): tilkkutäkki eri viivoista ei kelpaa.
     */
    const NAYTEVALI = 8;
    const tiukka = new Uint8Array(n);  // jana aidosti samassa urassa
    const levea = new Uint8Array(n);   // jana yhdistämiskorridorissa
    for (let i = 1; i < n; i += 1) {
      const jana = s[i] - s[i - 1];
      const naytteita = Math.max(1, Math.ceil(jana / NAYTEVALI));
      const hyppyRaja = Math.max(M.liitosHyppy, 2 * (jana / naytteita));
      // Päiden tyngät piirtyvät aina: kaupungista lähtee näkyvä viiva.
      // (Osuusyhdistäminen saa syödä tyngän vain solmuun asti, ks. alla.)
      let tiukkaOk = (s[i - 1] >= M.tyngat && (L - s[i]) >= M.tyngat) ? 1 : 0;
      let leveaOk = 1;
      let edX = 0;
      let edY = 0;
      for (let m = 0; m <= naytteita && (tiukkaOk || leveaOk); m += 1) {
        const t = m / naytteita;
        const x = poly[i - 1][0] + (poly[i][0] - poly[i - 1][0]) * t;
        const y = poly[i - 1][1] + (poly[i][1] - poly[i - 1][1]) * t;
        const k = t < 0.5 ? i - 1 : i;   // lähimmän kärjen ikkunasuunta
        if (tiukkaOk
          && !hakemisto.peitossa(x, y, ux[k], uy[k], M.etaisyys, cosRaja)) {
          tiukkaOk = 0;
        }
        if (leveaOk) {
          const o = liitosHakemisto.lahinSuuntainen(x, y, ux[k], uy[k], liitosSade, cosLiitos);
          if (!o || (m > 0 && Math.hypot(o.x - edX, o.y - edY) > hyppyRaja)) {
            leveaOk = 0;
          } else {
            edX = o.x;
            edY = o.y;
          }
        }
      }
      tiukka[i] = tiukkaOk;
      levea[i] = leveaOk;
    }
    /* Lyhyet peitot palautetaan piirtoon (ks. VAHIN). */
    let i = 1;
    while (i < n) {
      if (!tiukka[i]) { i += 1; continue; }
      let j = i;
      while (j + 1 < n && tiukka[j + 1]) j += 1;
      if (s[j] - s[i - 1] < M.vahin) for (let k = i; k <= j; k += 1) tiukka[k] = 0;
      i = j + 1;
    }
    /*
     * OSUUSYHDISTÄMINEN: riittävän pitkä yhtenäinen rinnakkaisjakso
     * leveässä korridorissa karsitaan kokonaan (ks. LIITOSSADE ja
     * omistajan sitaatti KARSINNASSA). Jakso saa ulottua reitin
     * päähän vain, jos päätesolmusta lähtee jo piirretty viiva —
     * muuten pää typistetään tyngän mitalle, kuten osuuskarsinnassa.
     */
    const liitosJaksot = [];   // janaväleinä [a, b]
    i = 1;
    while (i < n) {
      if (!levea[i]) { i += 1; continue; }
      let j = i;
      while (j + 1 < n && levea[j + 1]) j += 1;
      /*
       * Pään saa syödä solmuun asti vain PITKÄLTÄ reitiltä
       * (URAVAHIN, sama vartija kuin koko reitin pudotuksessa):
       * ilman rajaa lyhyt paikallishyppy (miami|havanna,
       * bermuda|halifax) katosi kuvasta kokonaan kahden
       * pidemmän uran väliin — ja lyhyt hyppy pitkien varjossa
       * on oma paikallisyhteytensä, ei rinnakkaismatka.
       */
      const paaLupa = L >= M.uraVahin;
      const alkuSolmussa = paaLupa && piirretytPaat.has(solmuAvain(poly[0]));
      const loppuSolmussa = paaLupa && piirretytPaat.has(solmuAvain(poly[n - 1]));
      /*
       * HAARASUU saa oman, lyhyemmän vähimmäispituutensa (ks.
       * LIITOSVAHINSOLMU): jakso, joka alkaa reitin omasta päästä
       * ja siitä solmusta, johon peittävä viiva on JO piirretty,
       * ei ole "hetkeksi lähentyvä" pari vaan kaksi reittiä, jotka
       * lähtevät samasta kaupungista yhtenä viivana.
       */
      const haarasuu = (i === 1 && alkuSolmussa) || (j === n - 1 && loppuSolmussa);
      if (s[j] - s[i - 1] >= (haarasuu ? M.liitosVahinSolmu : M.liitosVahin)) {
        let a = i;
        let b = j;
        /*
         * Jos jakso päättyy alle kahden tyngän päähän syötävästä
         * päästä (reitin viimeinen koukku solmuun rikkoo
         * rinnakkaisuuden — sahalin|tokiolla koukku on mitatusti 27
         * yksikköä), jakso jatketaan päähän asti: muuten kuvaan
         * jäisi parin katkon mittainen irtotynkä keskelle solmun
         * ruuhkaa.
         */
        if (a > 1 && s[a - 1] < 2 * M.tyngat && alkuSolmussa) a = 1;
        if (b < n - 1 && (L - s[b]) < 2 * M.tyngat && loppuSolmussa) b = n - 1;
        if (a === 1 && !alkuSolmussa) {
          while (a <= b && s[a - 1] < M.tyngat) a += 1;
        }
        if (b === n - 1 && !loppuSolmussa) {
          while (b >= a && (L - s[b]) < M.tyngat) b -= 1;
        }
        if (b >= a) {
          for (let k = a; k <= b; k += 1) tiukka[k] = 1;
          liitosJaksot.push([a, b]);
        }
      }
      i = j + 1;
    }

    /*
     * Kahden yhdistetyn jakson väliin jäävä alle VAHIN-mittainen
     * piirtyvä sirpale sulautetaan leikkaukseen: näytteenoton
     * välkkyvä raja jätti muuten keskelle yhdistettyä korridoria
     * pariin janaan leijuvan viivanpätkän (mitattu: kreeta|sisilia
     * [51,52], noin viisi yksikköä), joka ei ole kenenkään tynkä
     * eikä kenenkään viiva.
     */
    for (let k = 1; k < liitosJaksot.length; k += 1) {
      const [, b0] = liitosJaksot[k - 1];
      const [a1, b1] = liitosJaksot[k];
      if (a1 > b0 + 1 && s[a1 - 1] - s[b0] < M.vahin) {
        for (let m = b0 + 1; m < a1; m += 1) tiukka[m] = 1;
        liitosJaksot.splice(k - 1, 2, [liitosJaksot[k - 1][0], b1]);
        k -= 1;
      }
    }

    /* Piirtovälit: piirtyvien janojen yhtenäiset jaksot. */
    const valit = [];
    let karsittu = 0;
    i = 1;
    while (i < n) {
      if (tiukka[i]) {
        let j = i;
        while (j + 1 < n && tiukka[j + 1]) j += 1;
        karsittu += s[j] - s[i - 1];
        i = j + 1;
        continue;
      }
      let j = i;
      while (j + 1 < n && !tiukka[j + 1]) j += 1;
      valit.push([i - 1, j]);
      i = j + 1;
    }
    tilasto.karsittu += karsittu;
    if (karsittu > 0) tilasto.katkottuja += 1;
    if (liitosJaksot.length) tilasto.yhdistettyja += 1;
    /*
     * Tyhjä lista on mahdollinen VAIN kun molemmat päät yhtyivät
     * piirrettyyn solmuun asti: tyngät suojaavat päät kaikilta
     * muilta leikkauksilta. Silloin kumpaankin kaupunkiin tulee
     * viiva peittävää reittiä pitkin ja tämä reitti sulautuu
     * kuvassa niihin kokonaan.
     */
    r.piirtoValit = valit;

    /*
     * LIITTYMÄSILLAT: yhdistetyn jakson rajalla piirtyvä pää
     * liitetään peittävään viivaan, jotta viivat sulautuvat yhteen
     * ja haarautuvat taas erotessa (omistajan sitaatti KARSINNASSA).
     * Silta syntyy vain osuusyhdistämisen rajalle — osuuskarsinnan
     * (ETAISYYS) rajalla viivat ovat jo kiinni toisissaan — ja vain,
     * jos väliä on vähintään SILTAVAHIN. Silta osoittaa lähimpään
     * kohtaan JO PIIRRETYLLÄ viivalla; tulos on deterministinen,
     * koska hakemistossa on vain pidempien reittien piirtyvät janat.
     */
    const liittymat = [];
    const liitoksessa = (k) => liitosJaksot.some(([a, b]) => k >= a && k <= b);
    for (const [i0, i1] of valit) {
      // Väli [i0, i1] piirtää janat i0+1..i1: edeltävä jana on i0,
      // seuraava i1+1.
      for (const pi of [i0 > 0 && liitoksessa(i0) ? i0 : -1,
        i1 < n - 1 && liitoksessa(i1 + 1) ? i1 : -1]) {
        if (pi < 0) continue;
        const p = poly[pi];
        const o = liitosHakemisto.lahin(p[0], p[1], liitosSade * 1.5);
        if (o && o.d >= M.siltaVahin) liittymat.push([p[0], p[1], o.x, o.y]);
      }
    }
    r.liittymat = liittymat;
    tilasto.liittymia += liittymat.length;

    /* Piirretyt janat hakemistoihin seuraavia reittejä varten. */
    for (const [i0, i1] of r.piirtoValit) {
      for (let k = i0 + 1; k <= i1; k += 1) {
        hakemisto.lisaa(poly[k - 1][0], poly[k - 1][1], poly[k][0], poly[k][1]);
        liitosHakemisto.lisaa(poly[k - 1][0], poly[k - 1][1], poly[k][0], poly[k][1]);
      }
    }
    const pv = r.piirtoValit;
    if (pv.length) {
      if (pv[0][0] === 0) piirretytPaat.add(solmuAvain(poly[0]));
      if (pv[pv.length - 1][1] === n - 1) piirretytPaat.add(solmuAvain(poly[n - 1]));
    }

    /*
     * ASKELHELMET SEURAAVAT VIIVAA. Karsitulla osuudella viivaa ei ole,
     * ja helmi ilman viivaa olisi merkki tyhjässä meressä — vieläpä
     * kymmenkunta yksikköä sen viivan sivussa, joka sen korvaa. Peli
     * kävelee yhä kaikki askelmat (js/rules.js); tämä koskee vain
     * poltettua kuvaa.
     */
    if (r.askelmat?.length) {
      tilasto.askelmat += r.askelmat.length;
      const alat = r.piirtoValit.map(([i0, i1]) => [s[i0], s[i1]]);
      // Askelma idx: kaarenpituus (idx/steps) — sama kaava kuin
      // sisalto.mjs:n pointAlong, mutta tässä riittää lähin piste.
      const jaljella = r.askelmat.filter(([bx, by]) => {
        let paras = 0;
        let parasD = Infinity;
        for (let k = 0; k < n; k += 1) {
          const d = Math.hypot(poly[k][0] - bx, poly[k][1] - by);
          if (d < parasD) { parasD = d; paras = k; }
        }
        const sp = s[paras];
        return alat.some(([a0, a1]) => sp >= a0 && sp <= a1);
      });
      tilasto.karsitutAskelmat += r.askelmat.length - jaljella.length;
      r.askelmat = jaljella;
    }
  }
  return tilasto;
}
