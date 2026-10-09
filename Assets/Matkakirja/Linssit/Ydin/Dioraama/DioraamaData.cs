// DIORAAMAN LÄHDEDATA (Linnanrakentaja, speksi docs/raportit/dioraama-rajapinnat-20260929.md kohdat 1 ja 5).
// Jäsentää rakennus.json-muotoisen (tai käsin kirjoitetun testifixturen) JSON-merkkijonon Rakennus-puuksi
// MiniJsonilla. Kentät, joita Ydin-luokat (Kameraliike/Heratys/Ohjaaja/PoikkileikkausLinssi) eivät tarvitse
// (geoAnkkuri, aikakerros, lahteet, palikat — rakennuskoneen ja Unity-puolen omaa dataa) jätetään
// tarkoituksella lukematta; ylimääräiset JSON-kentät eivät riko jäsennystä.
//
// LISÄYS SPEKSIN YLI (kirjattu raporttiin, era 1): Rakennus.Aanet ei ollut speksin kohdan 5 Rakennus-listalla,
// mutta js/dioraama/ohjaaja.js:n askeleenKesto (rak.aanet[aani].kesto_s) ja sen kommentti "kuten C#:n Rakennus-
// malli" olettivat sen olevan olemassa. ERA 2 (dioraama-rajapinnat-era2-20260929.md kohta 3) muodollistaa tämän:
// luokka nimettiin AaniTiedosta Aaniksi ja sille lisättiin Id-kenttä (Lisenssi jätettiin pois, koska rakennus.json
// ei tulosta sitä aanet-oliolle — vain pankin lähdedatassa on lisenssi, ks. kohta 2 "AANET").
//
// ERA 2 -LISÄYKSET (kirjattu raporttiin, dioraama-rajapinnat-era2-20260929.md kohdat 2 ja 3): Pinta.ToistoU/
// ToistoV/Tekstuuri/VirtausU/VirtausV, Henkilo.PxPerM, Rakennus.Liekit + Liekki, Tila.Liekit + LiekkiPaikka,
// Rakennus.Aanet (uudelleennimetty) + Tila.Aanet + AaniPaikka, Kohta.Aani. Kaikki uusi on valinnaista: vanha
// paketti (ilman näitä JSON-kenttiä) jäsentyy ennallaan, uudet kentät jäävät oletusarvoihinsa.
//
// KOORDINAATTORIN LISÄYS 29.9. (era2 kohta 2 "AANET"): Tila.Tehosteet + TehosteJakso (tilan satunnaiset
// kertaäänet). Askel.N oli jo olemassa (repliikki-askel voi valita rivin sillä); rakennus.json:n aanet[id].Tiedosto
// sisältää nyt v<versio>-alikansion (natiivin URL-välimuisti) — merkkijono luetaan sellaisenaan, ei erillistä
// Versio-kenttää Aani-luokkaan.
//
// ERA 2B -LISÄYKSET (dioraama-rajapinnat-era2b-20260929.md kohdat 1 ja 4, P0/datakerros): Rakennus.Valaistus
// (+ Aurinko, Taivas), Tila.Valot (+ Valo: piste- ja tulivalot), Pinta.Kuvio (+ Kuvio: proseduraalisen kuvion
// varjostinparametrit, oletus Tyyppi "tasainen"), Asento.Kierto (+ Kierto: kameran kiertorajat, staattiset
// oletukset Kierto.OletusTila/OletusYleis), Henkilo.Malli3d (+ Malli3d, Mittasuhteet, Vaatteet: 3D-pienoisfiguurin
// kuvaus). Kaikki valinnaisia: vanha rakennus.json (ilman näitä kenttiä) jäsentyy ennallaan.
//
// ERA 2B, IKKUNAN AURINKO (omistajan valo-päätös 29.9.2026): Valo.Tyyppi/Kohti/Kulma ("keila"-tyyppinen
// valo — DioraamaValot.cs tekee siitä LightType.Spot) + Valaistus.Sisalla (aurinko/taivas-kertoimet, kun
// kamera on kohdistettu tilaan). Sisalla ei ole koskaan null (oletus 1/1); Valo.Tyyppi oletus "piste".
using System;
using System.Collections.Generic;
using Matkakirja.Peli;

namespace Matkakirja.Linssit.Dioraama
{
    /// <summary>Kameran asento: kohde + kompassikoordinaatit siitä (kohta 4). Katso Kameraliike.</summary>
    public readonly struct Asento
    {
        public readonly V3 Kohde;
        public readonly double Atsimuutti, Korkeus, Etaisyys, Fov, Aukko;
        /// <summary>Valinnaiset kiertorajat (era 2b, kohta 1 "kierto"); null = lähteessä ei kierto-kenttää —
        /// kutsuja valitsee tilanteeseen sopivan oletuksen (Kierto.OletusTila / Kierto.OletusYleis). Uusi
        /// kenttä oletusarvoisella parametrilla; vanhat 6-argumenttiset kutsut kääntyvät ennallaan.</summary>
        public readonly Kierto Kierto;
        public Asento(V3 kohde, double atsimuutti, double korkeus, double etaisyys, double fov, double aukko, Kierto kierto = null)
        { Kohde = kohde; Atsimuutti = atsimuutti; Korkeus = korkeus; Etaisyys = etaisyys; Fov = fov; Aukko = aukko; Kierto = kierto; }
    }

    /// <summary>Kameran kiertorajat yhtä Asentoa kohti (era 2b, kohta 1 "kierto"). AtsimuuttiMin/Max ovat
    /// asteina SUHTEESSA perusasennon atsimuuttiin; molemmat null = vapaa 360° kierto. KorkeusMin/Max asteina
    /// absoluuttisina, EtaisyysMin/Max kertoimina perusasennon etäisyydestä. OletusTila ja OletusYleis ovat
    /// speksin kohdan 1 valmiit oletusarvot sille tilanteelle, jossa rakennus.json ei anna kierto-kenttää
    /// (tilan kameralle vs. rakennuksen yleisnäkymän kameralle eri oletus — kutsuja tietää kummasta on kyse).</summary>
    public sealed class Kierto
    {
        public double? AtsimuuttiMin, AtsimuuttiMax;
        public double KorkeusMin, KorkeusMax, EtaisyysMin, EtaisyysMax;

        public static Kierto OletusTila => new Kierto
        { AtsimuuttiMin = -55, AtsimuuttiMax = 55, KorkeusMin = 6, KorkeusMax = 65, EtaisyysMin = 0.55, EtaisyysMax = 1.6 };

        public static Kierto OletusYleis => new Kierto
        { AtsimuuttiMin = null, AtsimuuttiMax = null, KorkeusMin = 8, KorkeusMax = 70, EtaisyysMin = 0.45, EtaisyysMax = 1.8 };
    }

    /// <summary>Hahmon spritelehden yksi animaatiosilmukka (rivi ruudukossa, ruutumäärä, toistonopeus).</summary>
    public sealed class Silmukka
    {
        public int Rivi, Ruudut, Fps;
    }

    /// <summary>Henkilöpankin (js/dioraama/pankit/henkilot.js) koostettu rivi + rakennuskoneen atlas-polku.</summary>
    public sealed class Henkilo
    {
        public string Id, Nimi, Atlas;
        public int RuutuL, RuutuK, Sarakkeet;
        public double PivotX, PivotY, KorkeusM;
        /// <summary>Maalatun atlaksen pikseliä per metri (era 2, kohta 2 "HENKILOT"); 0 = ei maalattu
        /// (paikkamerkkihahmo, ei kenttää lähteessä).</summary>
        public double PxPerM;
        public Dictionary<string, Silmukka> Silmukat = new Dictionary<string, Silmukka>();
        /// <summary>3D-pienoisfiguurin kuvaus (era 2b, kohta 4 "HENKILOT.malli3d"); null = lähteessä ei
        /// malli3d-kenttää (2D-atlashahmo jatkuu, kortit varalla).</summary>
        public Malli3d Malli3d;
    }

    /// <summary>Hahmon 3D-mittasuhteet metreinä (era 2b, kohta 4 "malli3d.mittasuhteet").</summary>
    public sealed class Mittasuhteet
    {
        public double PituusM, HartiatM, LantioM, PaaM;
    }

    /// <summary>Hahmon vaatetus (era 2b, kohta 4 "malli3d.vaatteet"); Housut ja Hame ovat toisensa poissulkevia
    /// lähteessä (housut|hame) mutta molemmat luetaan omaan kenttäänsä — vain toinen on ei-null kerrallaan.
    /// Esiliina ja Paahine ovat valinnaisia (Paahine: 'myssy' | 'huivi' | 'hattu' | null).</summary>
    public sealed class Vaatteet
    {
        public string Paita, Housut, Hame, Esiliina, Paahine;
    }

    /// <summary>Henkilön 3D-pienoisfiguuri (era 2b, kohta 4 "HENKILOT.malli3d"): rakennuskoneen tuottaman
    /// hahmot3d/&lt;id&gt;.glb:n kuvaus. Varit on vapaamuotoinen sanakirja (osan nimi → hex-väri), koska
    /// pankin varit-oliolla ei ole kiinteää avainjoukkoa. Glb luetaan rakennus.jsonin malli3d.glb-kentästä
    /// sellaisenaan (kuten Henkilo.Atlas); rakennuskone kirjoittaa siihen polun "hahmot3d/&lt;id&gt;.glb".</summary>
    public sealed class Malli3d
    {
        public Mittasuhteet Mittasuhteet;
        public Vaatteet Vaatteet;
        public Dictionary<string, string> Varit = new Dictionary<string, string>();
        public string Esine;
        public string Glb;
        /// <summary>SKINNATTU MALLI (Siirtoseppä 2.10.2026, omistaja loki 59b9df127): malli3d.skin; null = nivelhahmo (Glb).</summary>
        public SkinMalli Skin;
        /// <summary>Natiivin ladattava glb: skinnattu, jos sellainen on, muuten nivelhahmo.</summary>
        public string NatiiviGlb => !string.IsNullOrEmpty(Skin?.Faceit) ? Skin.Faceit : !string.IsNullOrEmpty(Skin?.Glb) ? Skin.Glb : Glb;
    }

    /// <summary>henkilot[id].malli3d.skin (Linnanrakentaja 2.10.: rakenna.mjs lisaaBlender + js/dioraama/hahmot-skin.json).</summary>
    /// <summary>Pelaajahahmo: glb, silmukka → leike, liikkeet (kesto, tavoitenopeus m/s, toistokerroin tavoitenopeudella).</summary>
    public sealed class PelaajaMalli
    {
        public string Glb, Nimi;
        public Dictionary<string, string> Leikkeet = new Dictionary<string, string>();
        public Dictionary<string, (double KestoS, double TavoiteMs, double Toistokerroin)> Liikkeet = new Dictionary<string, (double, double, double)>();
        /// <summary>Kertaeleen juuren siirto (liikkeet.&lt;nimi&gt;.root_siirto, hahmon kehyksessä glTF: y ylös, +z kasvot); esim. nousu_laiturille.</summary>
        public Dictionary<string, double[]> JuuriSiirto = new Dictionary<string, double[]>();
        /// <summary>Ensimmäisen persoonan kädet (pelaaja.kadet { glb, leikkeet, liikkeet }; hihat ja hanskat, ei ihoa; omistaja 7.10. 18.7x).</summary>
        public PelaajaMalli Kadet;
        /// <summary>Leikkeen tapahtumahetki sekunteina (liikkeet.&lt;nimi&gt;.ote tai .irrotus ruutuina / fps; kädet-v1: poiminta, laske, heitto).</summary>
        public Dictionary<string, double> TapahtumaS = new Dictionary<string, double>();
        /// <summary>Pidon ruutuväli sekunteina (liikkeet.&lt;nimi&gt;.pito; kädet-v1 suojaus 15–75 silmukkana).</summary>
        public Dictionary<string, (double Alku, double Loppu)> PitoS = new Dictionary<string, (double, double)>();
        /// <summary>Kameran (silmien) polku ruuduittain alkuruudun silmästä (liikkeet.&lt;nimi&gt;.kamera_polku, glTF hahmon kehys: +Z eteen, +X vasen).</summary>
        public Dictionary<string, double[][]> KameraPolku = new Dictionary<string, double[][]>();
    }

    public sealed class SkinMalli
    {
        public string Glb;
        /// <summary>FACEIT-glb (morph-kohteet; Linnanrakentaja v41, 7.10.2026): vain tämä koodi lukee sen. Vanhat appit lukevat Glb:n,
        /// jossa ei ole morph-kohteita (TF 154: "morph ei tuettu" → hahmot puuttuivat, kun morphit olivat Glb:ssä). null = Glb.</summary>
        public string Faceit;
        /// <summary>silmukka → GLB:n animations[].name; puuttuva tai null = samanniminen leike.</summary>
        public Dictionary<string, string> Leikkeet = new Dictionary<string, string>();
        /// <summary>Matka metreinä yhden kävelyleikkeen kierroksen aikana; 0 = luonnollinen nopeus.</summary>
        public double KavelySykliM;
        public double Skaala = 1;
    }

    /// <summary>Yksi liikesilmukka LIIKKEET-pankista (era 2b, kohta 4 "3D-HAHMOT"); JS-pari
    /// js/dioraama/pankit/liikkeet.js, C#-logiikkapari Ydin/Dioraama/Liikkeet.cs. Avaimet[nivel][i] =
    /// [t01, rx, ry, rz] (asteina, t01 kasvava 0..1) — sama muoto kuin lähteessä, ei esikäsittelyä tässä.
    /// JuuriNousuM null = silmukalla ei ole pystysuoraa "pomppua" (kohta 4: "juuri?: { nousu_m }").</summary>
    public sealed class Liike
    {
        public double KestoS;
        public double? JuuriNousuM;
        public Dictionary<string, double[][]> Avaimet = new Dictionary<string, double[][]>();
    }

    /// <summary>Pintapankin (js/dioraama/pankit/pinnat.js) rivi.</summary>
    /// <summary>Pinnan detaljikartta (LR 8.10.): albedo 0,5-pohjainen overlay, normaali tangenttiavaruudessa (OpenGL Y+), karheus kiiltoon;
    /// polut paketin juuresta, ASTC-vastineet valinnaisia (`astc: { albedo, normaali, karheus }`). M = toistoväli metreinä.</summary>
    public sealed class Detalji
    {
        public string Pinta, Albedo, Normaali, Karheus, AstcAlbedo, AstcNormaali, AstcKarheus;
        /// <summary>Parallaksi (LR v45s): korkeuskartta (lineaarinen, 1 = ylin) ja sen syvyys metreinä; null / 0 = ei POM:ia.</summary>
        public string Korkeus, AstcKorkeus;
        public double M = 1.5, Voima = 0.6, SyvyysM;
    }

    public sealed class Pinta
    {
        public string Id, Vari, Tekstuuri;
        /// <summary>Puolikkaan resoluution tekstuuri (era 2b, tekstuurimuisti 29.9.2026): tools/dioraama/
        /// tuo-codex.mjs + media.mjs tuottavat/kopioivat tämän Tekstuurin rinnalle (sips --resampleWidth,
        /// leveys/korkeus puolet). Null, jos pinnalla ei ole tekstuuria TAI paketti on rakennettu ennen tätä
        /// ominaisuutta -- DioraamaSovitin.LataaPinta käyttää silloin Tekstuuria kaikilla laitteilla.</summary>
        public string TekstuuriPuoli;
        public double Hehku;
        /// <summary>Vanha yksiarvoinen toisto (era 1); säilyy aina samana kuin ToistoU (era 2 kohta 3).</summary>
        public double ToistoM;
        /// <summary>UV-toisto metreinä ura/pystyakselilla (era 2 kohta 2 "PINNAT"/"UV"): lähteen toisto_m on
        /// joko numero (→ ToistoU = ToistoV) tai [u_m, v_m]-taulukko.</summary>
        public double ToistoU, ToistoV;
        /// <summary>UV-siirtymä metriä/s (era 2), vain vesipinnoilla; muuten (0, 0).</summary>
        public double VirtausU, VirtausV;
        /// <summary>Proseduraalisen kuvion varjostinparametrit (era 2b, kohta 1 "PINNAT.kuvio"); ei koskaan
        /// null — puuttuessa lähteestä Tyyppi = "tasainen" ja muut kentät 0.</summary>
        public Kuvio Kuvio = new Kuvio();
    }

    /// <summary>Pinnan proseduraalinen kuvio DioraamaKuviot.hlsl:n DioraamaKuvio()-funktiolle (era 2b, kohta 1
    /// "PINNAT.kuvio"): Tyyppi on yksi speksin listasta (tasainen | kivi | puu | lankku | rappaus | tiili |
    /// kallio | vesi | metalli | kangas | olki), KokoU/KokoV vastaavat lähteen koko_m:ää (metriä), Sauma
    /// lähteen sauma_m:ää ja Vaihtelu on 0–1. Oletus (lähteessä ei kuvio-kenttää tai se puuttuu tyhjäksi):
    /// Tyyppi "tasainen", muut 0.</summary>
    public sealed class Kuvio
    {
        public string Tyyppi = "tasainen";
        public double KokoU, KokoV, Sauma, Vaihtelu;
    }

    /// <summary>Äänipankin (js/dioraama/pankit/aanet.js) rivi rakennus.jsonista (era 2 kohta 2 "AANET";
    /// nimetty AaniTiedosta uudelleen, katso tiedoston alun huomautus). Ei Lisenssi-kenttää: rakennus.json ei
    /// tulosta sitä äänille (toisin kuin henkilöille).</summary>
    public sealed class Aani
    {
        public string Id, Tiedosto;
        public bool Silmukka;
        public double Voimakkuus, KestoS;
        /// <summary>Mikseritilan raidat (Pelikoodarin AaniMikseri 30.9.2026; valinnaisia): kuiva, kaiku (lyhyt vaste) ja
        /// kaikuPitka, näytetarkasti samanpituiset. Ilman mikseritilaa soi Tiedosto (poltettu versio).</summary>
        public string Kuiva, Kaiku, KaikuPitka;
        /// <summary>Huulisynkan kohdistus (FACEIT 6.10.2026): `kohdistus: { merkit, alut_s, loput_s }` tai ElevenLabsin
        /// alignment sellaisenaan (characters, character_start_times_seconds, character_end_times_seconds); null = ei kohdistusta.</summary>
        public Kohdistus Kohdistus;
    }

    /// <summary>Puheen merkkikohdistus: merkki i soi välillä Alut[i] … Loput[i] (s, klipin alusta).</summary>
    public sealed class Kohdistus
    {
        public string Merkit = "";
        public double[] Alut = Array.Empty<double>(), Loput = Array.Empty<double>();
    }

    /// <summary>Liekkipankin (js/dioraama/pankit/liekit.js) rivi + rakennuskoneen atlas-polku (era 2 kohta 2
    /// "LIEKIT").</summary>
    public sealed class Liekki
    {
        public string Id, Atlas;
        public int RuutuL, RuutuK, Sarakkeet, Ruudut, Fps;
        public double KokoL, KokoK, PivotX, PivotY;
    }

    /// <summary>Yksi liekki-instanssi tilassa (era 2 kohta 2: TILA.liekit-lista).</summary>
    public sealed class LiekkiPaikka
    {
        public string LiekkiId;
        public V3 Paikka;
        public double Koko, Vaihe;
    }

    /// <summary>Yksi tilakohtainen äänilähde (era 2 kohta 2: TILA.aanet-lista).</summary>
    public sealed class AaniPaikka
    {
        public string AaniId;
        public double Voimakkuus;
    }

    /// <summary>Yksi tilan valo (era 2b, kohta 1 "TILA.valot"): sama lista leipoo lämmön (G) rakennuskoneessa
    /// KUTEN ENNEN ja on lisäksi reaaliaikainen pistevalo natiivissa/esikatselussa (range = Sade, intensiteetti
    /// = Voima · 2,2). Vari ja Lepatus ovat valinnaisia: Vari null = ei väriohitusta (natiivi käyttää omaa
    /// oletustaan), Lepatus 0 = ei lepatusta (tulisijalla lepatus 0,35, ks. olavinlinna.js).</summary>
    public sealed class Valo
    {
        public V3 Paikka;
        public double Sade, Voima;
        public string Vari;
        public double Lepatus;
        /// <summary>Valon tyyppi (era 2b, ikkunan aurinko, omistajan valo-päätös 29.9.): "piste" (oletus, vanha
        /// pistevalo) tai "keila" (kartiovalo — DioraamaValot.cs tekee siitä LightType.Spot, ei lepatusta, ja
        /// rakenna.mjs ohittaa sen G-lämpöleivonnasta, koska auringonvalo ei ole lämpöä).</summary>
        public string Tyyppi = "piste";
        /// <summary>Keila-valon kohdepiste maailmassa (era 2b); null tyypille "piste" tai jos lähteessä ei ole
        /// kohti-kenttää.</summary>
        public V3? Kohti;
        /// <summary>Keila-valon koko kartiokulma asteina (era 2b) — DioraamaValot.cs asettaa tämän suoraan
        /// Unityn Light.spotAngle-kenttään (sama merkitys, ei puolikulma).</summary>
        public double Kulma;
    }

    /// <summary>Yksi tilan satunnaisten kertaäänien tehostejakso (era 2 kohta 2 "AANET": TILA.tehosteet-lista,
    /// koordinaattorin lisäys 29.9.). Soittaa AaniIdt-listalta yhden satunnaisen äänen kerrallaan, odottaen
    /// seuraavaa satunnaisin väliajoin ValiMin..ValiMax-väliltä (sekuntia).</summary>
    public sealed class TehosteJakso
    {
        public List<string> AaniIdt = new List<string>();
        public double ValiMin, ValiMax, Voimakkuus;
    }

    public sealed class Kohta
    {
        public string Teksti, Lahde;
        /// <summary>Äänen id Rakennus.Aanet-pankissa, tai null (era 2 kohta 2: taulu.kohdat[].aani).</summary>
        public string Aani;
        /// <summary>Kohteen paikka rakennuksen koordinaateissa (taulu.kohdat[].kohde.paikka) ja säde m, tai null: Pulu
        /// napautuksesta -tilassa napautus kohteeseen soittaa juuri tämän kohdan (omistajan linnapalaute 5.10.).</summary>
        public V3? KohdePaikka;
        public double KohdeSade;
    }

    public sealed class Taulu
    {
        public string Otsikko, Tila;
        public List<Kohta> Kohdat = new List<Kohta>();
    }

    public sealed class Repliikki
    {
        public string Id, Teksti, Aani;
    }

    public sealed class Reitti
    {
        public List<V3> Pisteet = new List<V3>();
        public double Nopeus, Tauko;
    }

    /// <summary>Yksi askel huoneen käsikirjoituksessa (kohta 1: ASKEL). Kaikki kentät läsnä, vain osa käytössä
    /// riippuen Tee-arvosta ("pulu-lenna" | "taulu" | "kohta" | "repliikki" | "reaktio" | "odota").</summary>
    public sealed class Askel
    {
        public string Tee;
        public int N;
        public string HahmoId;
        public double S;
    }

    /// <summary>Huoneessa oleva hahmo paikkoineen ja repliikkeineen (kohta 1: HAHMO).</summary>
    public sealed class Hahmo
    {
        public string Id, HenkiloId;
        public V3 Paikka;
        public double Suunta;
        public bool Peilattu;
        public string Silmukka;
        public int Heraa;
        /// <summary>Elävä linna: hahmo kantaa lyhtyä (`lyhty`: true; vartija, soutaja) — pieni liekki käden kohdalle.</summary>
        public bool Lyhty;
        public Reitti Reitti;
        public List<Repliikki> Repliikit = new List<Repliikki>();
        public Repliikki Reaktio;
        /// <summary>Final IK (Linnanrakentaja 5.10.2026): kädet esineisiin (`kadet`), tyhjä = ei käsi-IK:ta.</summary>
        public List<KasiKohde> Kadet = new List<KasiKohde>();
    }

    /// <summary>Käden kohde (`kadet[]`): "tartu" = kämmen kiinteään kahvaan (Paikka ja Kierto sijoitettuina kuten hahmon paikka),
    /// "kanna" = esine kiinni käden luussa (Siirto ja Kierto käden paikallisessa). Kasi "r" | "l"; Milloin "aina" | "tyo" |
    /// "puhe" | "idle" (silmukka); Paino 0–1. Kierto = kämmenen kehys (kämmen −Y, sormet +Z), [x, y, z, w]; null = ei annettu.</summary>
    public sealed class KasiKohde
    {
        public string Tyyppi = "tartu", Esine, Kasi = "r", Milloin = "aina";
        public V3 Paikka, Siirto;
        public double[] Kierto;
        public double Paino = 1;
    }

    /// <summary>Yksi huone/tila rakennuksessa (kohta 1: TILA), täydennettynä rakennuskoneen glb-tiedoilla.</summary>
    public sealed class Tila
    {
        public string Id, Nimi;
        public bool Kohdistettava;
        /// <summary>Nimilapun tärkeys (`lappujarjestys`, 1 = ensin; omistaja 4.10.: kauempaa näkyvät tärkeimmät, ainakin yksi).
        /// Puuttuva = tilojen järjestyksessä niiden jälkeen, joilla kenttä on.</summary>
        public int? LappuJarjestys;
        /// <summary>Ulkotila (erä 3: laituri, muurinharja): kohdistettuna aurinko ja taivas pysyvät täysinä
        /// (Valaistus.Sisalla-kertoimia ei käytetä). Puuttuva = false.</summary>
        public bool Ulkona;
        public V3 RajaMin, RajaMax;
        public List<string> Naapurit = new List<string>();
        public Asento Kamera;
        /// <summary>Pystynäytön asento (valinnainen `kameraPysty`); null = Kamera.</summary>
        public Asento? KameraPysty;
        public V3 PuluLaskeutuminen;
        public string Taulupuoli;
        public Taulu Taulu;
        public List<Hahmo> Hahmot = new List<Hahmo>();
        public List<Askel> Kasikirjoitus = new List<Askel>();
        public string GlbTiedosto, GlbSha256;
        /// <summary>LINNA (Siirtoseppä 29.9.2026): Blenderin Cyclesillä leivottu valoatlas (albedo × valo, AO, kuluma)
        /// tilan glb:n UV1:lle; `valoatlas: { tiedosto, puoli }` (4k iPad, 2k iPhone). null = rakennuskoneen tila
        /// (maalattu/valaistu varjostin kuten ennen).</summary>
        public string ValoAtlas, ValoAtlasPuoli;
        /// <summary>ASTC-pakattu valoatlas mip-ketjuna (.astcm, tyokalut/astc-mip.swift): `valoatlas.astc` / `astcPuoli`;
        /// null = JPEG kuten ennen.</summary>
        public string ValoAtlasAstc, ValoAtlasAstcPuoli;
        /// <summary>Hämärän valoatlas (`valoatlas.hamara { tiedosto, puoli, astc, astcPuoli }`); null = päiväversio myös hämärässä.</summary>
        public string HamaraAtlas, HamaraAtlasPuoli, HamaraAtlasAstc, HamaraAtlasAstcPuoli;
        /// <summary>8K-atlas (LR v45o: `astcIso` 8192² ASTC 6×6, `iso` JPEG; päivä ja hämärä) Ultra-tasolle; null = ei vietyä isoa.</summary>
        public string ValoAtlasAstcIso, ValoAtlasIso, HamaraAtlasAstcIso, HamaraAtlasIso;
        /// <summary>Kävelyosan valoatlas (LR 8.10., juna 169): atlas on pelkkä valo (valo × 0,5, ei väriä), joten pinnan väri tulee
        /// pintamateriaalista (DioraamaValaistu _ValoVain). Tilojen atlakset (albedo × valo) ovat false.</summary>
        public bool ValoVain;
        /// <summary>LINNA, leikkausikkuna kuoreen (speksi dioraama-rajapinnat-blender-20260929.md kohta 3):
        /// `leikkaus: { laajennus 1.0, kameraan true }` (oletus) tai käsin `{ min, max }` (korvaa rajat).</summary>
        public double LeikkausLaajennus = 1.0;
        public bool LeikkausKameraan = true;
        public V3? LeikkausMin, LeikkausMax;
        /// <summary>Elävä kohde (`elava`); null = vanha AABB-napautus.</summary>
        public Elava Elava;
        public List<EtsintaVaihe> Etsinta = new List<EtsintaVaihe>();
        /// <summary>Kuunnelma (tila.kuunnelma[]): rivit järjestyksessä, tekstitys huoneeseen tultaessa (UI/Linssit/Kuunnelma.cs).</summary>
        public List<KuunnelmaRivi> Kuunnelma = new List<KuunnelmaRivi>();
        public List<Esine> Esineet = new List<Esine>();
        /// <summary>Tilaan sijoitetut liekki-instanssit (era 2); tyhjä vanhassa muodossa.</summary>
        public List<LiekkiPaikka> Liekit = new List<LiekkiPaikka>();
        /// <summary>Tilaan sijoitetut äänilähteet (era 2); tyhjä vanhassa muodossa.</summary>
        public List<AaniPaikka> Aanet = new List<AaniPaikka>();
        /// <summary>Tilan valot (era 2b, kohta 1 "TILA.valot"); tyhjä vanhassa muodossa ja tiloissa, joilla ei
        /// ole valoja.</summary>
        public List<Valo> Valot = new List<Valo>();
        /// <summary>Tilan satunnaisten kertaäänien tehostejaksot (era 2, koordinaattorin lisäys 29.9.); tyhjä
        /// vanhassa muodossa ja tiloissa, joilla ei ole tehosteita.</summary>
        public List<TehosteJakso> Tehosteet = new List<TehosteJakso>();
        /// <summary>UUSI LINNA (omistaja 30.9.2026): huoneen infotaulu (`infotaulu: { nimi, rivit: [{ teksti, lahde }] }`,
        /// 1–2 riviä); null = vanha taulu (Taulu, kohdat 1/3).</summary>
        public Infotaulu Infotaulu;
        /// <summary>Pulun lisäkerronta (`pulu.teksti`): reunan Pulun kuvan napautus näyttää tämän kuplana; null = ei kuvaa.</summary>
        public string PuluTeksti;
        /// <summary>Pulun kertomuksen puheääni (`pulu.aani`, Pelikoodari 1.10.2026, #3742); null = vain teksti.</summary>
        public string PuluAani;
    }

    /// <summary>Auringon (päävalon) asetukset rakennuksen valaistuksessa (era 2b, kohta 1
    /// "RAKENNUS.valaistus.aurinko"); Atsimuutti/Korkeus kompassiasteina (valo tulee Atsimuutin suunnasta).</summary>
    public sealed class Aurinko
    {
        public double Atsimuutti, Korkeus, Voima;
        public string Vari;
    }

    /// <summary>Taivaan ambienttivalon asetukset (era 2b, kohta 1 "RAKENNUS.valaistus.taivas"): Yla/Ala ovat
    /// hex-värit gradientin ylä- ja alareunalle.</summary>
    public sealed class Taivas
    {
        public string Yla, Ala;
        public double Voima;
    }

    /// <summary>Aurinko/taivas-kertoimet kamera kohdistettuna tilaan (era 2b, omistajan valo-päätös 29.9.:
    /// "korkea lounaisaurinko tulvii avoimesta etelälaidasta ja vaalentaa sisätilan") — DioraamaValot.cs
    /// liukuu näihin ~1 s:ssa kun näkymän KohdeTila ≠ null, ja takaisin kertoimeen 1 yleisnäkymässä.
    /// Puuttuessa lähteestä (vanha rakennus.json TAI lähteessä ei sisalla-oliota) molemmat 1 = ei
    /// vaimennusta — Valaistus.Sisalla ei itse ole koskaan null (ks. alla).</summary>
    public sealed class Sisalla
    {
        public double Aurinko = 1, Taivas = 1;
    }

    /// <summary>Rakennuksen valaistus (era 2b, kohta 1 "RAKENNUS.valaistus"); null vanhassa rakennus.jsonissa
    /// (ei valaistus-kenttää lähteessä) — natiivi käyttää silloin omia oletuksiaan. Spekissä on myös valinnainen
    /// sumu-kenttä (aina null nykydatalla); sitä ei jäsennetä tässä erässä, ei ole tarvetta ennen toteutusta.</summary>
    public sealed class Valaistus
    {
        public Aurinko Aurinko;
        public Taivas Taivas;
        /// <summary>Ei koskaan null (era 2b) — LueValaistus asettaa aina joko lähteen sisalla-olion tai
        /// Sisalla:n omat oletusarvot (1, 1).</summary>
        public Sisalla Sisalla = new Sisalla();
        /// <summary>Etäisyysutu kameran etäisyyden kertoimina (Linnanrakentaja 7.10.: valaistus.sumu {alku, loppu}, Kielletty 0,9/3,2);
        /// null = näyttämön oletus (Olavinlinna ennallaan).</summary>
        public (double Alku, double Loppu)? Sumu;
    }

    /// <summary>Koko rakennus (kohta 1: RAKENNUS + rakennuskoneen lisäykset, kohta 3).</summary>
    /// <summary>ELÄVÄ LINNA, saapuminen (käsikirjoitus 29.9. kohta 1): kaari alkuasennosta yleiskameraan.
    /// `saapuminen: { alku: { atsimuutti, etaisyys, korkeus, kohde?, fov? }, kesto 18, lyhyt 6 }`.</summary>
    public sealed class Saapuminen
    {
        public double Atsimuutti = 200, Etaisyys = 600, Korkeus = 8;
        public V3? Kohde;
        public double? Fov;
        public double Kesto = 18, Lyhyt = 6;
        /// <summary>Kaaren loppu: null = yleisnäkymä (oletus), "kertoja" = suoraan kertojan 1. jakson lepoon (Linnanrakentaja
        /// 6.10.2026: kaari → yleis → järveltä -hyppy pois; 1. jakson kamera suunnitellaan kaaren jatkoksi).</summary>
        public string Loppu;
    }

    /// <summary>ELÄVÄ LINNA, tilan elävä kohde (kohta 2): napautuspiste yleisnäkymässä, sykkivä vihje ja kävelyreitti.</summary>
    public sealed class Elava
    {
        public V3 Kohde;
        public double Sade = 6;
        public bool Vihje;
        public ElavaReitti Reitti;
    }

    /// <summary>Hahmon kävelyreitti (vartija, soutaja): pisteet järjestyksessä, nopeus m/s, edestakaisin vai kierros.</summary>
    public sealed class ElavaReitti
    {
        public string Henkilo;
        public List<V3> Pisteet = new List<V3>();
        public double Nopeus = 0.8;
        public bool Edestakaisin = true, Lyhty;
    }

    /// <summary>ELÄVÄ LINNA, etsintä (käsikirjoitus kohta 4: voudin sinetti): RAKENNUS.etsinnat[].</summary>
    public sealed class Etsinta
    {
        public string Id, Nimi, Kuvaus;
        public List<string> Vaiheet = new List<string>();
        public List<(string Teksti, string Lahde)> Kortti = new List<(string, string)>();
    }

    /// <summary>Huoneen infotaulu (uusi linna 30.9.2026): nimi ja 1–2 riviä lähteineen.</summary>
    public sealed class Infotaulu
    {
        public string Nimi;
        public List<(string Teksti, string Lahde)> Rivit = new List<(string, string)>();
    }

    /// <summary>Huoneen kuunnelman rivi (Päätoimittaja 30.9.2026, `tila.kuunnelma[]`): puhuja = tilan hahmon id tai "pulu",
    /// nimi tekstitykseen, huom (esim. "oven takaa"), aani = tuleva ääni-id (null, kunnes omistaja valitsee äänet).</summary>
    /// <summary>Monipuhujaoton vuoro (kohtaukset v2, omistaja 5.10.: keskustelu yhtenä ottona): puhuja = hahmon id, ajat
    /// sekunteina äänitiedoston alusta (Pelikoodarin aikaleimat).</summary>
    public sealed class KuunnelmaVuoro
    {
        /// <summary>Ilme (vuorot[].ilme, valinnainen): kasvokuvan muunnelma puhujan yläpuolella (omistaja 5.10. klo 14.3x).</summary>
        public string Puhuja, Teksti, Ilme;
        /// <summary>Ele (vuorot[].ele, valinnainen): puhujan eleleike tämän vuoron ajaksi (henkilön malli3d.leikkeet-avain, esim.
        /// "osoitus", "olankohautus"); puuttuva leike → puhe (omistaja 5.10. klo 14.4x).</summary>
        public string Ele;
        public double AlkuS, LoppuS;
    }

    public sealed class KuunnelmaRivi
    {
        public string Id, Puhuja, Nimi, Huom, Teksti, Aani;
        /// <summary>Keskustelurivin vuorot (tyhjä = yksi puhuja koko rivin).</summary>
        public List<KuunnelmaVuoro> Vuorot = new List<KuunnelmaVuoro>();
        /// <summary>Vuoro rivin paikallisella hetkellä s (vuorojen välissä edellinen), tai null.</summary>
        public KuunnelmaVuoro VuoroHetkella(double s)
        {
            KuunnelmaVuoro r = null;
            foreach (var v in Vuorot) if (v.AlkuS <= s) r = v;
            return r;
        }
        public bool Pulu => Puhuja == "pulu";
        /// <summary>Kesto ilman ääntä: 14 merkkiä sekunnissa + 0,6 s tauko (Päätoimittaja 30.9.).</summary>
        public double TekstinKesto => (Teksti?.Length ?? 0) / 14.0 + 0.6;
    }

    /// <summary>Kertojan esittelyjakso (uusi linna 30.9.2026, `kertoja.jaksot[]`): teksti (≤ 3 virkettä) ja kamera,
    /// johon kierros lentää; kesto valinnainen (oletus max(6, merkit / 14) s).</summary>
    public sealed class KertojaJakso
    {
        public string Id, Teksti, Aani;
        /// <summary>Tila, jonka leikkausikkuna avataan jakson ajaksi (`tila`, esim. laituri kuoren sisällä); null = ei leikkausta.</summary>
        public string Tila;
        public Asento Kamera;
        public Asento? KameraPysty;
        public double? KestoS;
        public double Kesto => KestoS ?? Math.Max(6.0, (Teksti?.Length ?? 0) / 14.0);
        /// <summary>Luennan tukisanat (Päätoimittaja 5.10., omistajan TF 141 -palaute): `avainsanat: [{ t_s, vuosi?, sanat }]`,
        /// t_s sekunteina kertojan klipin alusta (Linnanrakentaja mittaa kohdistuksesta).</summary>
        public List<Avainsana> Avainsanat = new List<Avainsana>();
        /// <summary>Paikkojen nimet kertojan mainitessa ne (Linnanrakentaja 6.10.2026, tornit-jakso): `nimet: [{ teksti, paikka:
        /// [x,y,z], alku_s, kesto_s }]`; alku_s kertojan klipin alusta kuten avainsanoilla, kesto oletuksena 3 s (nimikyltti).</summary>
        public List<JaksonNimi> Nimet = new List<JaksonNimi>();
        /// <summary>Kuva kertojan maininnalle (esim. linnan perustaja): `kuva: { tiedosto, alku_s, kesto_s, lahde, tekija }`.</summary>
        public JaksonKuva Kuva;
    }

    public sealed class JaksonNimi
    {
        public string Teksti;
        public V3 Paikka;
        public double Alku, Kesto = 3;
    }

    public sealed class JaksonKuva
    {
        public string Tiedosto, Lahde, Tekija;
        public double Alku, Kesto = 6;
    }

    public sealed class Avainsana
    {
        public double Ts;
        public string Vuosi, Sanat;
    }

    /// <summary>Tilan etsintävaihe (tila.etsinta[]): repliikki (hahmo kertoo), vihje (esine/kaiverrus) tai löytö (kansi + esine).</summary>
    public sealed class EtsintaVaihe
    {
        public string Etsinta, Tyyppi, Teksti, Hahmo, Kansi, Esine, Pulu;
        /// <summary>Vihjeen lyhyt rivi infotauluun (uusi linna 30.9.2026, `rivi`); null = ei riviä.</summary>
        public string Rivi;
        public int Vaihe;
        public V3 Kohde;
        public double Sade = 0.8;
    }

    /// <summary>Irtoesine omana glb:nä (tila.esineet[]): maailmakoordinaatit; kannella sarana, akseli ja avautumiskulma.</summary>
    public sealed class Esine
    {
        public string Id, Tiedosto;
        public V3? Sarana, Akseli;
        public double Avaa;
    }

    /// <summary>Ulkokuoren glb-polut laatutasoittain (puuttuva taso = seuraava kevyempi käytössä).</summary>
    /// <summary>
    /// Linnan ympäristö (omistajan hyväksymä ympäristösuunnitelma 1.10.2026; Linnanrakentajan aineisto, MML CC BY 4.0):
    /// `ymparisto: { huippu, normaali, kevyt (glb), orto: { huippu, normaali, kevyt } (jpg/astcm), puut (puut.json),
    /// puukortit (puukortit.json), horisontti (glb), horisontti_kuva, syvyys: { kuva, pikseli_m, kerroin_m, origo } }`.
    /// Koordinaatit kuten kuoressa (vesi −7, origo = kuoren origo).
    /// </summary>
    public sealed class Ymparisto
    {
        public string Huippu, Normaali, Kevyt;
        /// <summary>Staattiset lisämallit kanonisissa koordinaateissa (historiamoottori V0, 7.10.2026: rantakivet, myöhemmin vene ym.):
        /// ymparisto.mallit[] { id, huippu, kevyt }; Linnanrakentajan ymparisto.rantakivet { huippu, kevyt } luetaan id:llä "rantakivet".</summary>
        public List<(string Id, string Huippu, string Kevyt)> Mallit = new List<(string, string, string)>();
        /// <summary>Sijoittamattomat mallit (rekvisiitta, origo omassa juuressaan; Timeline tai seikkailu sijoittaa): ymparisto.mallit[] jossa
        /// "maailmaan": false, tai id "vene" ilman maailmaan-kenttää (Linnanrakentajan v43: vene ei ole maailmaan sijoitettu).</summary>
        public List<(string Id, string Huippu, string Kevyt)> Rekvisiitta = new List<(string, string, string)>();
        public string OrtoHuippu, OrtoNormaali, OrtoKevyt;
        public string Puut, Puukortit, Horisontti, HorisonttiKuva;
        /// <summary>Veden syvyyskartta (8 bit, 0 = ranta): kuva, pikselin koko, metriä/arvo ja kuvan vasen yläkulma (Blender x, y).</summary>
        public string SyvyysKuva;
        public double SyvyysPikseliM = 1.953125, SyvyysKerroinM = 0.1176;
        public double SyvyysOrigoX = -2000, SyvyysOrigoY = 2000;
        /// <summary>Maanpinnan kerrosvarjostin (splat, Päätoimittaja 1.10.2026): lähialueen CC0-kerrokset maskilla; null = pelkkä ilmakuva.</summary>
        public MaastoKerrokset Maasto;
        /// <summary>Aluskasvillisuus korttipareina: atlas (json kuten puukortit) ja lista [x, y, z, laji, koko]; null = ei aluskasveja.</summary>
        public string AluskasvitAtlas, AluskasvitLista;
        /// <summary>Paketin muoto 1.10. (rakenna.mjs): puukortit = atlas-png ja puukortit_tiedot = json; aluskasvit.atlas = png ja
        /// aluskasvit.kortit = json. Vanha muoto (json suoraan puukortit/atlas-kentässä, png sen "atlas"-avaimesta) toimii yhä.</summary>
        public string PuukortitTiedot, AluskasvitKortit;
        /// <summary>Puukorttien tangenttiavaruuden normaalikartta (puukortit v3, #3763: OpenGL, kortin tasossa, sama atlasjako
        /// kuin puukortit); null = tasainen kortti.</summary>
        public string PuukortitNormaali;
        /// <summary>Ensilataus v2 (Päätoimittaja 1.10.2026): valmiiksi pakatut ASTC-mipketjut (.astcm, astc-mip.swift) —
        /// laite lataa ne suoraan GPU:lle ilman PNG/JPEG-purkua ja pakkausta; png/jpg-kentät jäävät simulaattorin ja
        /// vanhojen natiivien varalle. null = ei ASTC:tä.</summary>
        public string PuukortitAstc, PuukortitNormaaliAstc, HorisonttiKuvaAstc, TaivasAstc, TaivasHamaraAstc, AluskasvitAtlasAstc;
        /// <summary>Taivas equirect-kuvana (Linnanrakentajan Poly Haven -HDRI sävykartoitettuna): päivä, hämärä ja
        /// atsimuutti (°), johon kuvan u = 0 osoittaa; null = liukuväri.</summary>
        public string Taivas, TaivasHamara;
        public double TaivasSuunta;
    }

    /// <summary>`ymparisto.maasto`: alue [minX, minZ, maxX, maxZ] (Unity x/z = Blender x/y), maski (huippu, RGBA × 2 = kerrokset
    /// 0–7), maski_normaali (RGBA = 0–3), kerrokset [{ id, diff, nor, toisto_m }], lahi_m (detalji häipyy makroon).</summary>
    public sealed class MaastoKerrokset
    {
        public double MinX, MinZ, MaxX, MaxZ, LahiM = 400;
        public List<string> Maski = new List<string>();
        public string MaskiNormaali;
        public List<(string Id, string Diff, string Nor, double ToistoM)> Kerrokset = new List<(string, string, string, double)>();
        /// <summary>Ensilataus v2: ASTC-kuvat ja keskikirkkaus (lineaarinen, 0,2126/0,7152/0,0722) Kerrokset-järjestyksessä.</summary>
        public List<(string DiffAstc, string NorAstc, double? Keski)> KerroksetAstc = new List<(string, string, double?)>();
    }

    public sealed class Ulkokuori
    {
        public string Huippu, Normaali, Kevyt;
        /// <summary>ASTC-tekstuurit tasoittain (.astcm; `tekstuurit: { huippu, normaali, kevyt }`); puuttuva = glb:n JPEG.</summary>
        public string AstcHuippu, AstcNormaali, AstcKevyt;
        /// <summary>Hämärätekstuurit (tunnelma, omistaja 29.9. 21.4x): `tekstuurit.hamara` (.astcm) ja `tekstuurit.hamaraJpg`
        /// (varalle, esim. simulaattori ilman ASTC:tä) tasoittain; sama UV kuin päivällä.</summary>
        public string HamaraHuippu, HamaraNormaali, HamaraKevyt, HamaraJpgHuippu, HamaraJpgNormaali, HamaraJpgKevyt;
        /// <summary>Päivän JPEG-vara tasoittain (`tekstuurit.jpg`, Linnanrakentaja 4.10.): ennen kuin glb:n upotettu JPEG
        /// poistetaan, ASTC:tä tukematon laite (simulaattori) hakee päiväkuvan tästä; puuttuva = glb:n upotettu JPEG.</summary>
        public string JpgHuippu, JpgNormaali, JpgKevyt;
        /// <summary>Järven pinnan korkeus metreinä (`vesi`, oletus −7): fotogrammetriasta vesi on poistettu, ja natiivi
        /// piirtää järven pinnan "vesi" tälle korkeudelle.</summary>
        public double VesiY = -7;
        /// <summary>Lähidetalji (menetelmä B, 30.9.2026; `detalji`); null = ei detaljia.</summary>
        public KuoriDetalji Detalji;
    }

    /// <summary>Kuoren lähidetalji: UV0-maski (R muuri, G katto, B maa, A kallio) ja neljä laattaavaa sarjaa samassa
    /// järjestyksessä (`kanavat[]`: diff, nor, toisto_m); voimakkuus (kirkkaus) ja normaali (valon kallistus).</summary>
    public sealed class KuoriDetalji
    {
        public string Maski;
        public double Voimakkuus = 0.8, Normaali = 0.7;
        public List<(string Diff, string Nor, double ToistoM)> Kanavat = new List<(string, string, double)>();
        /// <summary>Ensilataus v2 (1.10.2026): valmiiksi pakatut ASTC-kuvat ja keskikirkkaus (lineaarinen, 0,299/0,587/0,114)
        /// samassa järjestyksessä kuin Kanavat; null = jpg + runtime-pakkaus kuten ennen.</summary>
        public List<(string DiffAstc, string NorAstc, double? Keski)> KanavatAstc = new List<(string, string, double?)>();
    }

    public sealed class Rakennus
    {
        public string Id, Nimi, Otsikko;
        /// <summary>Nimiruudun alarivi (Linnanrakentaja 7.10.: "Peking · 1873"); null = DioraamaSovitin.SaapumisAlarivi.</summary>
        public string Alarivi;
        /// <summary>Historiamoottorin kävelygeometria (kavely { osat, merkit }, polut paketin juuresta); null = ei kävelytilaa.</summary>
        public string KavelyOsat, KavelyMerkit;
        /// <summary>Historiamoottorin pelaajahahmo (Linnanrakentaja v44c: rakennus.json pelaaja { glb, leikkeet, liikkeet }); null = kapseli.</summary>
        public PelaajaMalli Pelaaja;
        public int Versio;
        public Asento YleisVaaka, YleisPysty;
        public V3 PuluLaskeutuminen;
        public Taulu Taulu;
        /// <summary>Rakennuksen valaistus (era 2b, kohta 1); null vanhassa muodossa.</summary>
        public Valaistus Valaistus;
        /// <summary>LINNA (Siirtoseppä 29.9.2026): fotogrammetrinen ulkokuori kolmella laatutasolla
        /// (`ulkokuori: { huippu, normaali, kevyt }`, glb-polut paketin juuresta); null = ei kuorta.</summary>
        public Ulkokuori Ulkokuori;
        /// <summary>Linnan ympäristö (maasto, puut, horisontti, veden syvyys); null = ei ympäristöä.</summary>
        public Ymparisto Ymparisto;
        /// <summary>Oletustunnelma (`tunnelma`: "paiva" | "hamara"); puuttuva = päivä.</summary>
        public string Tunnelma;
        /// <summary>Yleisnäkymän nimilaput (`nimilaput`, oletus true). Elävän linnan käsikirjoitus 29.9.: ei nimilappuja —
        /// tilat tunnistetaan siitä, mitä niissä tapahtuu.</summary>
        public bool Nimilaput = true;
        /// <summary>Saapumiskaari (elävä linna); null = vanha avaus ilman lentoa.</summary>
        public Saapuminen Saapuminen;
        public List<Etsinta> Etsinnat = new List<Etsinta>();
        public List<Tila> Tilat = new List<Tila>();
        public Dictionary<string, Henkilo> Henkilot = new Dictionary<string, Henkilo>();
        public Dictionary<string, Pinta> Pinnat = new Dictionary<string, Pinta>();
        /// <summary>Detaljikartat pintanimen mukaan (LR 8.10., juna 169: `detaljit: { kivi: { albedo, normaali, karheus, astc, m, voima } }`);
        /// triplanaarisesti leivotun valon päälle (DioraamaDetalji.hlsl). Pinta ilman merkintää jää ilman detaljia.</summary>
        public Dictionary<string, Detalji> Detaljit = new Dictionary<string, Detalji>();
        /// <summary>Detaljit omassa tiedostossaan (LR v45l: `detaljit: "blender/materiaalit/detaljit.json"`, polku paketin juuresta);
        /// null = rivissä tai ei detaljeja. Sovitin lataa ja jäsentää sen (LueDetaljit).</summary>
        public string DetaljitTiedosto;
        /// <summary>Käytetyt liekkimääritykset (era 2); tyhjä vanhassa muodossa.</summary>
        public Dictionary<string, Liekki> Liekit = new Dictionary<string, Liekki>();
        public Dictionary<string, Aani> Aanet = new Dictionary<string, Aani>();
        /// <summary>Liikesilmukkapankki (era 2b, kohta 4); tyhjä, jos rakennus.json:ssa ei ole liikkeet-
        /// kenttää (rakennuskone lisää sen vain, jos rakennuksella on ≥1 3D-hahmo — tools/dioraama/rakenna.mjs).</summary>
        public Dictionary<string, Liike> Liikkeet = new Dictionary<string, Liike>();
        /// <summary>Pulun kiertue (era 3 kohta 5): kohdistettavien tilojen id:t järjestyksessä; puuttuva = tyhjä lista.</summary>
        public List<string> Kiertue = new List<string>();
        /// <summary>UUSI LINNA (omistaja 30.9.2026): kertojan esittely ja kamerakierros saapumisen jälkeen (`kertoja.jaksot`);
        /// tyhjä = ei kierrosta (vanha avaustaulu).</summary>
        public List<KertojaJakso> Kertoja = new List<KertojaJakso>();
        /// <summary>Linnan oma Pulun lisäkerronta yleisnäkymään (`pulu.teksti`); null = ei.</summary>
        public string PuluTeksti;
        /// <summary>Pulun kertomuksen puheääni (`pulu.aani`, Pelikoodari 1.10.2026, #3742); null = vain teksti.</summary>
        public string PuluAani;

        /// <summary>Tila id:llä, tai null jos ei löydy (kuten js:n loydaTila).</summary>
        public Tila Tila(string id)
        {
            foreach (var t in Tilat) if (t.Id == id) return t;
            return null;
        }
    }

    public static class DioraamaData
    {
        /// <summary>Jäsentää rakennus.json:n (tai vastaavan käsin kirjoitetun fixturen) Rakennus-puuksi.</summary>
        static PelaajaMalli LuePelaajaMalli(Dictionary<string, object> pel, string oletusNimi)
        {
            var pm = new PelaajaMalli { Glb = MiniJson.Teksti(pel, "glb"), Nimi = MiniJson.Teksti(pel, "nimi") ?? oletusNimi };
            foreach (var kv in MiniJson.ObjektiTaiNull(MiniJson.Kentta(pel, "leikkeet")) ?? new Dictionary<string, object>())
                if (kv.Value is string ls) pm.Leikkeet[kv.Key] = ls;
            foreach (var kv in MiniJson.ObjektiTaiNull(MiniJson.Kentta(pel, "liikkeet")) ?? new Dictionary<string, object>())
                if (kv.Value is Dictionary<string, object> lo)
                {
                    pm.Liikkeet[kv.Key] = (MiniJson.Luku(lo, "kesto_s") ?? 1, MiniJson.Luku(lo, "tavoite_m_s") ?? 0, MiniJson.Luku(lo, "toistokerroin") ?? 1);
                    var rs = MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(lo, "root_siirto"));
                    if (rs.Count == 3 && rs[0] is double rx && rs[1] is double ry && rs[2] is double rz) pm.JuuriSiirto[kv.Key] = new[] { rx, ry, rz };
                    double fps = MiniJson.Luku(lo, "fps") ?? MiniJson.Luku(pel, "fps") ?? 30;
                    if ((MiniJson.Luku(lo, "ote") ?? MiniJson.Luku(lo, "irrotus")) is double tr && fps > 0) pm.TapahtumaS[kv.Key] = tr / fps;
                    var pi = MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(lo, "pito"));
                    if (pi.Count == 2 && pi[0] is double pa && pi[1] is double pb && pb > pa && fps > 0) pm.PitoS[kv.Key] = (pa / fps, pb / fps);
                    var kp = MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(lo, "kamera_polku"));
                    if (kp.Count >= 2)
                    {
                        var polku = new List<double[]>();
                        foreach (var q in kp) { var l = MiniJson.TaulukkoTaiTyhja(q); if (l.Count == 3 && l[0] is double qx && l[1] is double qy && l[2] is double qz) polku.Add(new[] { qx, qy, qz }); }
                        if (polku.Count == kp.Count) pm.KameraPolku[kv.Key] = polku.ToArray();
                    }
                }
            return pm;
        }

        /// <summary>Tekstiavain (Peli/Tekstit.cs): &lt;alue&gt;.&lt;ryhmä&gt;.&lt;id&gt; pienin kirjaimin, muut merkit väliviivoiksi (tyokalut/tekstit_olavinlinna.py).</summary>
        public static string TekstiAvain(string alue, string ryhma, string id)
        {
            string N(string x) { var b = new System.Text.StringBuilder(); bool v = false; foreach (char c in (x ?? "").ToLowerInvariant()) { if (c >= 'a' && c <= 'z' || c >= '0' && c <= '9') { b.Append(c); v = false; } else if (!v && b.Length > 0) { b.Append('-'); v = true; } } return b.ToString().TrimEnd('-'); }
            return N(alue) + "." + ryhma + "." + N(id);
        }

        public static Rakennus Lue(string json)
        {
            var juuri = MiniJson.Objekti(MiniJson.Jasenna(json));
            var r = new Rakennus
            {
                Id = MiniJson.Teksti(juuri, "id"),
                Nimi = MiniJson.Teksti(juuri, "nimi"),
                Otsikko = MiniJson.Teksti(juuri, "otsikko"),
                Versio = (int)(MiniJson.Luku(juuri, "versio") ?? 0),
            };
            r.Tunnelma = MiniJson.Teksti(juuri, "tunnelma");
            r.Nimilaput = MiniJson.Totuus(juuri, "nimilaput", true);
            r.Alarivi = MiniJson.Teksti(juuri, "alarivi");
            var kav = MiniJson.ObjektiTaiNull(MiniJson.Kentta(juuri, "kavely"));
            r.KavelyOsat = MiniJson.Teksti(kav, "osat"); r.KavelyMerkit = MiniJson.Teksti(kav, "merkit");
            if (MiniJson.ObjektiTaiNull(MiniJson.Kentta(juuri, "pelaaja")) is Dictionary<string, object> pel && !string.IsNullOrEmpty(MiniJson.Teksti(pel, "glb")))
            {
                var pm = LuePelaajaMalli(pel, "pelaaja");
                if (MiniJson.ObjektiTaiNull(MiniJson.Kentta(pel, "kadet")) is Dictionary<string, object> ka && !string.IsNullOrEmpty(MiniJson.Teksti(ka, "glb")))
                    pm.Kadet = LuePelaajaMalli(ka, "kadet");
                r.Pelaaja = pm;
            }
            foreach (var eo in MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(juuri, "etsinnat")))
            {
                var e = MiniJson.ObjektiTaiNull(eo);
                if (e == null) continue;
                var et = new Etsinta { Id = MiniJson.Teksti(e, "id"), Nimi = MiniJson.Teksti(e, "nimi"), Kuvaus = MiniJson.Teksti(e, "kuvaus") };
                foreach (var v in MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(e, "vaiheet"))) if (v is string vs) et.Vaiheet.Add(vs);
                foreach (var ko in MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(MiniJson.ObjektiTaiNull(MiniJson.Kentta(e, "kortti")), "kohdat")))
                {
                    var k = MiniJson.ObjektiTaiNull(ko);
                    if (k != null) et.Kortti.Add((MiniJson.Teksti(k, "teksti"), MiniJson.Teksti(k, "lahde")));
                }
                if (et.Id != null) r.Etsinnat.Add(et);
            }
            var saap = MiniJson.ObjektiTaiNull(MiniJson.Kentta(juuri, "saapuminen"));
            if (saap != null)
            {
                var alku = MiniJson.ObjektiTaiNull(MiniJson.Kentta(saap, "alku"));
                r.Saapuminen = new Saapuminen
                {
                    Atsimuutti = MiniJson.Luku(alku, "atsimuutti") ?? 200, Etaisyys = MiniJson.Luku(alku, "etaisyys") ?? 600,
                    Korkeus = MiniJson.Luku(alku, "korkeus") ?? 8, Fov = MiniJson.Luku(alku, "fov"),
                    Kohde = MiniJson.Kentta(alku, "kohde") != null ? LueV3(MiniJson.Kentta(alku, "kohde")) : (V3?)null,
                    Kesto = MiniJson.Luku(saap, "kesto") ?? 18, Lyhyt = MiniJson.Luku(saap, "lyhyt") ?? 6,
                    Loppu = MiniJson.Teksti(saap, "loppu"),
                };
            }
            var ymp = MiniJson.ObjektiTaiNull(MiniJson.Kentta(juuri, "ymparisto"));
            if (ymp != null)
            {
                var orto = MiniJson.ObjektiTaiNull(MiniJson.Kentta(ymp, "orto"));
                var syv = MiniJson.ObjektiTaiNull(MiniJson.Kentta(ymp, "syvyys"));
                var y = new Ymparisto
                {
                    Huippu = MiniJson.Teksti(ymp, "huippu"), Normaali = MiniJson.Teksti(ymp, "normaali"), Kevyt = MiniJson.Teksti(ymp, "kevyt"),
                    OrtoHuippu = MiniJson.Teksti(orto, "huippu"), OrtoNormaali = MiniJson.Teksti(orto, "normaali"), OrtoKevyt = MiniJson.Teksti(orto, "kevyt"),
                    Puut = MiniJson.Teksti(ymp, "puut"), Puukortit = MiniJson.Teksti(ymp, "puukortit"), PuukortitTiedot = MiniJson.Teksti(ymp, "puukortit_tiedot"), PuukortitNormaali = MiniJson.Teksti(ymp, "puukortit_normaali"),
                    PuukortitAstc = MiniJson.Teksti(ymp, "puukortit_astc"), PuukortitNormaaliAstc = MiniJson.Teksti(ymp, "puukortit_normaali_astc"),
                    HorisonttiKuvaAstc = MiniJson.Teksti(ymp, "horisontti_kuva_astc"),
                    Horisontti = MiniJson.Teksti(ymp, "horisontti"), HorisonttiKuva = MiniJson.Teksti(ymp, "horisontti_kuva"),
                    SyvyysKuva = MiniJson.Teksti(syv, "kuva"),
                };
                foreach (var mo in MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(ymp, "mallit")))
                    if (MiniJson.ObjektiTaiNull(mo) is Dictionary<string, object> m && !string.IsNullOrEmpty(MiniJson.Teksti(m, "huippu") ?? MiniJson.Teksti(m, "kevyt")))
                    {
                        var mid = MiniJson.Teksti(m, "id") ?? "malli";
                        bool maailmaan = MiniJson.Kentta(m, "maailmaan") is bool mb ? mb : mid != "vene";
                        (maailmaan ? y.Mallit : y.Rekvisiitta).Add((mid, MiniJson.Teksti(m, "huippu"), MiniJson.Teksti(m, "kevyt")));
                    }
                if (MiniJson.ObjektiTaiNull(MiniJson.Kentta(ymp, "rantakivet")) is Dictionary<string, object> rk && !string.IsNullOrEmpty(MiniJson.Teksti(rk, "huippu") ?? MiniJson.Teksti(rk, "kevyt")))
                    y.Mallit.Add(("rantakivet", MiniJson.Teksti(rk, "huippu"), MiniJson.Teksti(rk, "kevyt")));
                if (MiniJson.Luku(syv, "pikseli_m") is double pm) y.SyvyysPikseliM = pm;
                if (MiniJson.Luku(syv, "kerroin_m") is double km) y.SyvyysKerroinM = km;
                var origo = MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(syv, "origo"));
                if (origo.Count >= 2 && origo[0] is double ox && origo[1] is double oy) { y.SyvyysOrigoX = ox; y.SyvyysOrigoY = oy; }
                var maasto = MiniJson.ObjektiTaiNull(MiniJson.Kentta(ymp, "maasto"));
                if (maasto != null)
                {
                    var mk = new MaastoKerrokset { MaskiNormaali = MiniJson.Teksti(maasto, "maski_normaali"), LahiM = MiniJson.Luku(maasto, "lahi_m") ?? 400 };
                    var alue = MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(maasto, "alue"));
                    if (alue.Count >= 4 && alue[0] is double a0 && alue[1] is double a1 && alue[2] is double a2 && alue[3] is double a3)
                    { mk.MinX = a0; mk.MinZ = a1; mk.MaxX = a2; mk.MaxZ = a3; }
                    foreach (var m in MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(maasto, "maski"))) if (m is string ms) mk.Maski.Add(ms);
                    foreach (var ko in MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(maasto, "kerrokset")))
                    {
                        var k = MiniJson.ObjektiTaiNull(ko);
                        if (k == null) continue;
                        mk.Kerrokset.Add((MiniJson.Teksti(k, "id"), MiniJson.Teksti(k, "diff"), MiniJson.Teksti(k, "nor"), MiniJson.Luku(k, "toisto_m") ?? 2));
                        mk.KerroksetAstc.Add((MiniJson.Teksti(k, "diff_astc"), MiniJson.Teksti(k, "nor_astc"), MiniJson.Luku(k, "keski")));
                    }
                    if (mk.MaxX > mk.MinX && mk.MaxZ > mk.MinZ && mk.Kerrokset.Count > 0) y.Maasto = mk;
                }
                var alus = MiniJson.ObjektiTaiNull(MiniJson.Kentta(ymp, "aluskasvit"));
                y.AluskasvitAtlas = MiniJson.Teksti(alus, "atlas");
                y.AluskasvitLista = MiniJson.Teksti(alus, "lista");
                y.AluskasvitKortit = MiniJson.Teksti(alus, "kortit");
                y.AluskasvitAtlasAstc = MiniJson.Teksti(alus, "atlas_astc");
                y.Taivas = MiniJson.Teksti(ymp, "taivas");
                y.TaivasHamara = MiniJson.Teksti(ymp, "taivas_hamara");
                y.TaivasAstc = MiniJson.Teksti(ymp, "taivas_astc");
                y.TaivasHamaraAstc = MiniJson.Teksti(ymp, "taivas_hamara_astc");
                y.TaivasSuunta = MiniJson.Luku(ymp, "taivas_suunta") ?? 0;
                r.Ymparisto = y;
            }
            var kuori = MiniJson.ObjektiTaiNull(MiniJson.Kentta(juuri, "ulkokuori"));
            if (kuori != null)
                r.Ulkokuori = new Ulkokuori
                {
                    Huippu = MiniJson.Teksti(kuori, "huippu"), Normaali = MiniJson.Teksti(kuori, "normaali"),
                    Kevyt = MiniJson.Teksti(kuori, "kevyt"),
                };
            if (r.Ulkokuori != null && MiniJson.Luku(kuori, "vesi") is double vesiY) r.Ulkokuori.VesiY = vesiY;
            var detalji = MiniJson.ObjektiTaiNull(MiniJson.Kentta(kuori, "detalji"));
            if (r.Ulkokuori != null && detalji != null)
            {
                var kd = new KuoriDetalji
                {
                    Maski = MiniJson.Teksti(detalji, "maski"),
                    Voimakkuus = MiniJson.Luku(detalji, "voimakkuus") ?? 0.8, Normaali = MiniJson.Luku(detalji, "normaali") ?? 0.7,
                };
                foreach (var ko in MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(detalji, "kanavat")))
                {
                    var k = MiniJson.ObjektiTaiNull(ko);
                    if (k == null) continue;
                    kd.Kanavat.Add((MiniJson.Teksti(k, "diff"), MiniJson.Teksti(k, "nor"), MiniJson.Luku(k, "toisto_m") ?? 2));
                    kd.KanavatAstc.Add((MiniJson.Teksti(k, "diff_astc"), MiniJson.Teksti(k, "nor_astc"), MiniJson.Luku(k, "keski")));
                }
                if (kd.Maski != null && kd.Kanavat.Count > 0) r.Ulkokuori.Detalji = kd;
            }
            var kuoriTekstuurit = MiniJson.ObjektiTaiNull(MiniJson.Kentta(kuori, "tekstuurit"));
            if (r.Ulkokuori != null && kuoriTekstuurit != null)
            {
                r.Ulkokuori.AstcHuippu = MiniJson.Teksti(kuoriTekstuurit, "huippu");
                r.Ulkokuori.AstcNormaali = MiniJson.Teksti(kuoriTekstuurit, "normaali");
                r.Ulkokuori.AstcKevyt = MiniJson.Teksti(kuoriTekstuurit, "kevyt");
                var h = MiniJson.ObjektiTaiNull(MiniJson.Kentta(kuoriTekstuurit, "hamara"));
                var hj = MiniJson.ObjektiTaiNull(MiniJson.Kentta(kuoriTekstuurit, "hamaraJpg"));
                r.Ulkokuori.HamaraHuippu = MiniJson.Teksti(h, "huippu"); r.Ulkokuori.HamaraNormaali = MiniJson.Teksti(h, "normaali");
                r.Ulkokuori.HamaraKevyt = MiniJson.Teksti(h, "kevyt");
                r.Ulkokuori.HamaraJpgHuippu = MiniJson.Teksti(hj, "huippu"); r.Ulkokuori.HamaraJpgNormaali = MiniJson.Teksti(hj, "normaali");
                r.Ulkokuori.HamaraJpgKevyt = MiniJson.Teksti(hj, "kevyt");
                var pj = MiniJson.ObjektiTaiNull(MiniJson.Kentta(kuoriTekstuurit, "jpg"));
                r.Ulkokuori.JpgHuippu = MiniJson.Teksti(pj, "huippu"); r.Ulkokuori.JpgNormaali = MiniJson.Teksti(pj, "normaali");
                r.Ulkokuori.JpgKevyt = MiniJson.Teksti(pj, "kevyt");
            }
            var yleiskamera = MiniJson.ObjektiTaiNull(MiniJson.Kentta(juuri, "yleiskamera"));
            r.YleisVaaka = LueAsento(MiniJson.ObjektiTaiNull(MiniJson.Kentta(yleiskamera, "vaaka")));
            r.YleisPysty = LueAsento(MiniJson.ObjektiTaiNull(MiniJson.Kentta(yleiskamera, "pysty")));
            var pulu = MiniJson.ObjektiTaiNull(MiniJson.Kentta(juuri, "pulu"));
            r.PuluLaskeutuminen = LueV3(MiniJson.Kentta(pulu, "laskeutuminen"));
            r.PuluTeksti = MiniJson.Teksti(pulu, "teksti");
            r.PuluAani = MiniJson.Teksti(pulu, "aani");
            foreach (var jo in MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(MiniJson.ObjektiTaiNull(MiniJson.Kentta(juuri, "kertoja")), "jaksot")))
            {
                var j = MiniJson.ObjektiTaiNull(jo);
                if (j == null) continue;
                r.Kertoja.Add(new KertojaJakso
                {
                    // Tekstit avaimella (PT 9.10., käännettävyys): <rakennus>.kertoja.<jakso>.teksti, datan teksti varalla.
                    Id = MiniJson.Teksti(j, "id"), Teksti = Tekstit.TaiData(TekstiAvain(r.Id, "kertoja", MiniJson.Teksti(j, "id")) + ".teksti", MiniJson.Teksti(j, "teksti")),
                    Aani = MiniJson.Teksti(j, "aani"), Tila = MiniJson.Teksti(j, "tila"),
                    Kamera = LueAsento(MiniJson.ObjektiTaiNull(MiniJson.Kentta(j, "kamera"))),
                    KameraPysty = MiniJson.ObjektiTaiNull(MiniJson.Kentta(j, "kameraPysty")) is Dictionary<string, object> jkp
                        ? LueAsento(jkp) : (Asento?)null,
                    KestoS = MiniJson.Luku(j, "kesto_s"),
                });
                foreach (var ao in MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(j, "avainsanat")))
                    if (MiniJson.ObjektiTaiNull(ao) is Dictionary<string, object> a && MiniJson.Luku(a, "t_s") is double ts)
                    {
                        var kj = r.Kertoja[r.Kertoja.Count - 1]; string ak = TekstiAvain(r.Id, "kertoja", kj.Id) + ".avainsana." + kj.Avainsanat.Count;
                        kj.Avainsanat.Add(new Avainsana { Ts = ts, Vuosi = Tekstit.TaiData(ak + ".vuosi", MiniJson.Teksti(a, "vuosi")), Sanat = Tekstit.TaiData(ak + ".sanat", MiniJson.Teksti(a, "sanat")) });
                    }
                foreach (var no in MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(j, "nimet")))
                    if (MiniJson.ObjektiTaiNull(no) is Dictionary<string, object> nm && MiniJson.Kentta(nm, "paikka") != null
                        && !string.IsNullOrEmpty(MiniJson.Teksti(nm, "teksti")))
                        r.Kertoja[r.Kertoja.Count - 1].Nimet.Add(new JaksonNimi
                        {
                            Teksti = MiniJson.Teksti(nm, "teksti"), Paikka = LueV3(MiniJson.Kentta(nm, "paikka")),
                            Alku = MiniJson.Luku(nm, "alku_s") ?? 0, Kesto = MiniJson.Luku(nm, "kesto_s") ?? 3,
                        });
                if (MiniJson.ObjektiTaiNull(MiniJson.Kentta(j, "kuva")) is Dictionary<string, object> ku && !string.IsNullOrEmpty(MiniJson.Teksti(ku, "tiedosto")))
                    r.Kertoja[r.Kertoja.Count - 1].Kuva = new JaksonKuva
                    {
                        Tiedosto = MiniJson.Teksti(ku, "tiedosto"), Lahde = MiniJson.Teksti(ku, "lahde"), Tekija = MiniJson.Teksti(ku, "tekija"),
                        Alku = MiniJson.Luku(ku, "alku_s") ?? 0, Kesto = MiniJson.Luku(ku, "kesto_s") ?? 6,
                    };
            }
            r.Taulu = LueTaulu(MiniJson.ObjektiTaiNull(MiniJson.Kentta(juuri, "taulu")));
            r.Valaistus = LueValaistus(MiniJson.ObjektiTaiNull(MiniJson.Kentta(juuri, "valaistus")));
            foreach (var rivi in MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(juuri, "kiertue")))
            {
                var id = rivi as string;
                if (!string.IsNullOrEmpty(id)) r.Kiertue.Add(id);
            }

            foreach (var rivi in MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(juuri, "tilat")))
            {
                var o = MiniJson.ObjektiTaiNull(rivi);
                if (o != null) r.Tilat.Add(LueTila(o));
            }
            foreach (var pari in MiniJson.ObjektiTaiNull(MiniJson.Kentta(juuri, "henkilot")) ?? new Dictionary<string, object>())
            {
                var o = MiniJson.ObjektiTaiNull(pari.Value);
                if (o != null) r.Henkilot[pari.Key] = LueHenkilo(pari.Key, o);
            }
            if (MiniJson.Kentta(juuri, "detaljit") is string detaljitTiedosto) r.DetaljitTiedosto = detaljitTiedosto;
            else LueDetaljit(MiniJson.ObjektiTaiNull(MiniJson.Kentta(juuri, "detaljit")), r.Detaljit);
            foreach (var pari in MiniJson.ObjektiTaiNull(MiniJson.Kentta(juuri, "pinnat")) ?? new Dictionary<string, object>())
            {
                var o = MiniJson.ObjektiTaiNull(pari.Value);
                if (o == null) continue;
                var (tu, tv) = LueToisto(o);
                var virtaus = MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(o, "virtaus"));
                double vu = virtaus.Count > 0 && virtaus[0] is double vud ? vud : 0;
                double vv = virtaus.Count > 1 && virtaus[1] is double vvd ? vvd : 0;
                r.Pinnat[pari.Key] = new Pinta { Id = pari.Key, Vari = MiniJson.Teksti(o, "vari"),
                    ToistoM = tu, ToistoU = tu, ToistoV = tv, Hehku = MiniJson.Luku(o, "hehku") ?? 0,
                    Tekstuuri = MiniJson.Teksti(o, "tekstuuri"), TekstuuriPuoli = MiniJson.Teksti(o, "tekstuuri_puoli"),
                    VirtausU = vu, VirtausV = vv, Kuvio = LueKuvio(o) };
            }
            foreach (var pari in MiniJson.ObjektiTaiNull(MiniJson.Kentta(juuri, "liekit")) ?? new Dictionary<string, object>())
            {
                var o = MiniJson.ObjektiTaiNull(pari.Value);
                if (o != null) r.Liekit[pari.Key] = LueLiekki(pari.Key, o);
            }
            foreach (var pari in MiniJson.ObjektiTaiNull(MiniJson.Kentta(juuri, "aanet")) ?? new Dictionary<string, object>())
            {
                var o = MiniJson.ObjektiTaiNull(pari.Value);
                if (o != null)
                    r.Aanet[pari.Key] = new Aani { Id = pari.Key, Tiedosto = MiniJson.Teksti(o, "tiedosto"),
                        Silmukka = MiniJson.Totuus(o, "silmukka"), Voimakkuus = MiniJson.Luku(o, "voimakkuus") ?? 1,
                        KestoS = MiniJson.Luku(o, "kesto_s") ?? 0, Kuiva = MiniJson.Teksti(o, "kuiva"),
                        Kaiku = MiniJson.Teksti(o, "kaiku"), KaikuPitka = MiniJson.Teksti(o, "kaikuPitka"),
                        Kohdistus = LueKohdistus(MiniJson.ObjektiTaiNull(MiniJson.Kentta(o, "kohdistus"))) };
            }
            foreach (var pari in MiniJson.ObjektiTaiNull(MiniJson.Kentta(juuri, "liikkeet")) ?? new Dictionary<string, object>())
            {
                var o = MiniJson.ObjektiTaiNull(pari.Value);
                if (o != null) r.Liikkeet[pari.Key] = LueLiike(o);
            }
            // Elävät reittihahmot vasta nyt, kun henkilöt tunnetaan (tuntematon henkilö ohitetaan, ei kaatumista).
            foreach (var tila in r.Tilat) ElavaReittiHahmoksi(tila, r);
            return r;
        }

        /// <summary>Yksi LIIKKEET-pankin silmukka (era 2b, kohta 4) — sama muoto kuin js/dioraama/pankit/
        /// liikkeet.js: avaimet[nivel] = [[t01,rx,ry,rz], ...]. Nivel tai avainrivi, joka ei jäsenny
        /// (esim. rivi ei ole 4 lukua), jää pois — ei kaada koko silmukan lukemista.</summary>
        static Liike LueLiike(Dictionary<string, object> o)
        {
            var l = new Liike { KestoS = MiniJson.Luku(o, "kesto_s") ?? 0 };
            var juuriKentta = MiniJson.ObjektiTaiNull(MiniJson.Kentta(o, "juuri"));
            if (juuriKentta != null) l.JuuriNousuM = MiniJson.Luku(juuriKentta, "nousu_m");
            foreach (var pari in MiniJson.ObjektiTaiNull(MiniJson.Kentta(o, "avaimet")) ?? new Dictionary<string, object>())
            {
                var rivit = MiniJson.TaulukkoTaiTyhja(pari.Value);
                var avaimet = new double[rivit.Count][];
                for (int i = 0; i < rivit.Count; i++)
                {
                    var rivi = MiniJson.TaulukkoTaiTyhja(rivit[i]);
                    double Osa(int k) => rivi.Count > k && rivi[k] is double d ? d : 0;
                    avaimet[i] = new[] { Osa(0), Osa(1), Osa(2), Osa(3) };
                }
                l.Avaimet[pari.Key] = avaimet;
            }
            return l;
        }

        /// <summary>toisto_m on joko numero (→ U = V = numero) tai [u_m, v_m] (era 2 kohta 2 "PINNAT"/"UV").</summary>
        static (double u, double v) LueToisto(Dictionary<string, object> o)
        {
            var arvo = MiniJson.Kentta(o, "toisto_m");
            if (arvo is List<object> l)
            {
                double u = l.Count > 0 && l[0] is double du ? du : 0;
                double v = l.Count > 1 && l[1] is double dv ? dv : u;
                return (u, v);
            }
            double numero = arvo is double d ? d : 0;
            return (numero, numero);
        }

        /// <summary>Lukee pinnan valinnaisen kuvio-kentän (era 2b, kohta 1 "PINNAT.kuvio"). Puuttuessa tai
        /// tyhjänä palauttaa oletuksen Tyyppi = "tasainen", muut kentät 0 (Kuvion oma oletusarvo).</summary>
        static Kuvio LueKuvio(Dictionary<string, object> o)
        {
            var kuvio = MiniJson.ObjektiTaiNull(MiniJson.Kentta(o, "kuvio"));
            if (kuvio == null) return new Kuvio();
            var k = new Kuvio { Tyyppi = MiniJson.Teksti(kuvio, "tyyppi") ?? "tasainen" };
            var koko = MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(kuvio, "koko_m"));
            k.KokoU = koko.Count > 0 && koko[0] is double ku ? ku : 0;
            k.KokoV = koko.Count > 1 && koko[1] is double kv ? kv : 0;
            k.Sauma = MiniJson.Luku(kuvio, "sauma_m") ?? 0;
            k.Vaihtelu = MiniJson.Luku(kuvio, "vaihtelu") ?? 0;
            return k;
        }

        /// <summary>Lukee rakennuksen valinnaisen valaistus-kentän (era 2b, kohta 1 "RAKENNUS.valaistus").
        /// Palauttaa null, jos lähteessä ei ole valaistus-oliota lainkaan (vanha rakennus.json).</summary>
        static Valaistus LueValaistus(Dictionary<string, object> o)
        {
            if (o == null) return null;
            var v = new Valaistus();
            var aurinko = MiniJson.ObjektiTaiNull(MiniJson.Kentta(o, "aurinko"));
            if (aurinko != null) v.Aurinko = new Aurinko { Atsimuutti = MiniJson.Luku(aurinko, "atsimuutti") ?? 0,
                Korkeus = MiniJson.Luku(aurinko, "korkeus") ?? 0, Vari = MiniJson.Teksti(aurinko, "vari"),
                Voima = MiniJson.Luku(aurinko, "voima") ?? 0 };
            var taivas = MiniJson.ObjektiTaiNull(MiniJson.Kentta(o, "taivas"));
            if (taivas != null) v.Taivas = new Taivas { Yla = MiniJson.Teksti(taivas, "yla"),
                Ala = MiniJson.Teksti(taivas, "ala"), Voima = MiniJson.Luku(taivas, "voima") ?? 0 };
            var sisalla = MiniJson.ObjektiTaiNull(MiniJson.Kentta(o, "sisalla"));
            if (sisalla != null) v.Sisalla = new Sisalla { Aurinko = MiniJson.Luku(sisalla, "aurinko") ?? 1,
                Taivas = MiniJson.Luku(sisalla, "taivas") ?? 1 };
            var sumu = MiniJson.ObjektiTaiNull(MiniJson.Kentta(o, "sumu"));
            if (sumu != null && MiniJson.Luku(sumu, "alku") is double sa && MiniJson.Luku(sumu, "loppu") is double sl && sa > 0 && sl > sa) v.Sumu = (sa, sl);
            return v;
        }

        static Liekki LueLiekki(string id, Dictionary<string, object> o)
        {
            var l = new Liekki
            {
                Id = id, Atlas = MiniJson.Teksti(o, "atlas"),
                Sarakkeet = (int)(MiniJson.Luku(o, "sarakkeet") ?? 0),
                Ruudut = (int)(MiniJson.Luku(o, "ruudut") ?? 0),
                Fps = (int)(MiniJson.Luku(o, "fps") ?? 0),
            };
            var ruutu = MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(o, "ruutu"));
            l.RuutuL = ruutu.Count > 0 && ruutu[0] is double rl ? (int)rl : 0;
            l.RuutuK = ruutu.Count > 1 && ruutu[1] is double rk ? (int)rk : 0;
            var koko = MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(o, "koko_m"));
            l.KokoL = koko.Count > 0 && koko[0] is double kl ? kl : 0;
            l.KokoK = koko.Count > 1 && koko[1] is double kk ? kk : 0;
            var pivot = MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(o, "pivot"));
            l.PivotX = pivot.Count > 0 && pivot[0] is double px ? px : 0;
            l.PivotY = pivot.Count > 1 && pivot[1] is double py ? py : 0;
            return l;
        }

        /// <summary>
        /// Elävä linna: tila.elava.reitti (vartija muurinharjalla, soutaja laiturilla) tilan hahmoksi, jolla on Reitti ja
        /// lyhty. Ensimmäinen piste on lähtöpaikka; tauko 0. Id "elava-&lt;henkilö&gt;".
        /// </summary>
        static void ElavaReittiHahmoksi(Tila t, Rakennus rak)
        {
            var r = t.Elava?.Reitti;
            if (r == null || string.IsNullOrEmpty(r.Henkilo) || r.Pisteet.Count < 2) return;
            if (rak.Henkilot == null || !rak.Henkilot.ContainsKey(r.Henkilo)) return;
            t.Hahmot.Add(new Hahmo
            {
                Id = "elava-" + r.Henkilo, HenkiloId = r.Henkilo, Paikka = r.Pisteet[0], Lyhty = r.Lyhty, Silmukka = "idle",
                Reitti = new Reitti { Pisteet = new List<V3>(r.Pisteet), Nopeus = r.Nopeus, Tauko = 0 },
            });
        }

        /// <summary>Kohdistus omasta (merkit/alut_s/loput_s) tai ElevenLabsin muodosta; merkit taulukkona tai merkkijonona.</summary>
        public static Kohdistus LueKohdistus(Dictionary<string, object> o)
        {
            if (o == null) return null;
            object m = MiniJson.Kentta(o, "merkit") ?? MiniJson.Kentta(o, "characters");
            object a = MiniJson.Kentta(o, "alut_s") ?? MiniJson.Kentta(o, "character_start_times_seconds");
            object l = MiniJson.Kentta(o, "loput_s") ?? MiniJson.Kentta(o, "character_end_times_seconds");
            string merkit = m as string;
            if (merkit == null)
            {
                var sb = new System.Text.StringBuilder();
                foreach (var x in MiniJson.TaulukkoTaiTyhja(m)) { var t = x as string; sb.Append(string.IsNullOrEmpty(t) ? ' ' : t[0]); }
                merkit = sb.ToString();
            }
            double[] Luvut(object arvo)
            {
                var lista = MiniJson.TaulukkoTaiTyhja(arvo);
                var t = new double[lista.Count];
                for (int i = 0; i < t.Length; i++) t[i] = lista[i] is double d ? d : 0;
                return t;
            }
            var k = new Kohdistus { Merkit = merkit, Alut = Luvut(a), Loput = Luvut(l) };
            int n = Math.Min(k.Merkit.Length, Math.Min(k.Alut.Length, k.Loput.Length));
            if (n == 0) return null;
            if (n < k.Merkit.Length) k.Merkit = k.Merkit.Substring(0, n);
            return k;
        }

        static V3 LueV3(object arvo)
        {
            var l = MiniJson.TaulukkoTaiTyhja(arvo);
            double Osa(int i) => l.Count > i && l[i] is double d ? d : 0;
            return new V3(Osa(0), Osa(1), Osa(2));
        }

        static Asento LueAsento(Dictionary<string, object> o)
        {
            if (o == null) return default;
            return new Asento(LueV3(MiniJson.Kentta(o, "kohde")), MiniJson.Luku(o, "atsimuutti") ?? 0,
                MiniJson.Luku(o, "korkeus") ?? 0, MiniJson.Luku(o, "etaisyys") ?? 0,
                MiniJson.Luku(o, "fov") ?? 0, MiniJson.Luku(o, "aukko") ?? 0, LueKierto(o));
        }

        /// <summary>Lukee Asennon valinnaisen kierto-kentän (era 2b, kohta 1 "kierto"). Palauttaa null, jos
        /// lähteessä ei ole kierto-oliota lainkaan; muuten atsimuutti puuttuu/JSON null → AtsimuuttiMin/Max
        /// jäävät nulliksi (vapaa 360°). Kutsuja soveltaa Kierto.OletusTila / Kierto.OletusYleis, kun tämä
        /// palauttaa null (ei kierto-kenttää lähteessä).</summary>
        static Kierto LueKierto(Dictionary<string, object> o)
        {
            var k = MiniJson.ObjektiTaiNull(MiniJson.Kentta(o, "kierto"));
            if (k == null) return null;
            var kierto = new Kierto();
            if (MiniJson.Kentta(k, "atsimuutti") is List<object> at && at.Count > 1)
            {
                kierto.AtsimuuttiMin = at[0] is double amin ? amin : 0;
                kierto.AtsimuuttiMax = at[1] is double amax ? amax : 0;
            }
            var korkeus = MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(k, "korkeus"));
            kierto.KorkeusMin = korkeus.Count > 0 && korkeus[0] is double kmin ? kmin : 0;
            kierto.KorkeusMax = korkeus.Count > 1 && korkeus[1] is double kmax ? kmax : 0;
            var etaisyys = MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(k, "etaisyys"));
            kierto.EtaisyysMin = etaisyys.Count > 0 && etaisyys[0] is double emin ? emin : 0;
            kierto.EtaisyysMax = etaisyys.Count > 1 && etaisyys[1] is double emax ? emax : 0;
            return kierto;
        }

        static Taulu LueTaulu(Dictionary<string, object> o)
        {
            if (o == null) return null;
            var t = new Taulu { Otsikko = MiniJson.Teksti(o, "otsikko"), Tila = MiniJson.Teksti(o, "tila") };
            foreach (var rivi in MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(o, "kohdat")))
            {
                var k = MiniJson.ObjektiTaiNull(rivi);
                if (k == null) continue;
                var kohde = MiniJson.ObjektiTaiNull(MiniJson.Kentta(k, "kohde"));
                t.Kohdat.Add(new Kohta { Teksti = MiniJson.Teksti(k, "teksti"), Lahde = MiniJson.Teksti(k, "lahde"),
                    Aani = MiniJson.Teksti(k, "aani"),
                    KohdePaikka = kohde != null && MiniJson.Kentta(kohde, "paikka") != null ? LueV3(MiniJson.Kentta(kohde, "paikka")) : (V3?)null,
                    KohdeSade = kohde != null ? MiniJson.Luku(kohde, "sade") ?? 0.6 : 0 });
            }
            return t;
        }

        /// <summary>Detaljit pintanimen mukaan objektista `{ kivi: { albedo, normaali, karheus, astc: {…}, m, voima } }`.</summary>
        public static void LueDetaljit(Dictionary<string, object> detaljit, Dictionary<string, Detalji> ulos)
        {
            foreach (var pari in detaljit ?? new Dictionary<string, object>())
            {
                var o = MiniJson.ObjektiTaiNull(pari.Value);
                if (o == null) continue;
                var astc = MiniJson.ObjektiTaiNull(MiniJson.Kentta(o, "astc"));
                ulos[pari.Key] = new Detalji
                {
                    Pinta = pari.Key, Albedo = MiniJson.Teksti(o, "albedo"), Normaali = MiniJson.Teksti(o, "normaali"), Karheus = MiniJson.Teksti(o, "karheus"),
                    AstcAlbedo = MiniJson.Teksti(astc, "albedo"), AstcNormaali = MiniJson.Teksti(astc, "normaali"), AstcKarheus = MiniJson.Teksti(astc, "karheus"),
                    Korkeus = MiniJson.Teksti(o, "korkeus"), AstcKorkeus = MiniJson.Teksti(astc, "korkeus"), SyvyysM = Math.Max(0, MiniJson.Luku(o, "syvyys_m") ?? 0),
                    M = MiniJson.Luku(o, "m") is double m && m > 0.05 ? m : 1.5, Voima = Math.Max(0, Math.Min(1, MiniJson.Luku(o, "voima") ?? 0.6)),
                };
            }
        }

        /// <summary>Erillinen detaljitiedosto (LR v45l: `{ versio, koodaus, detaljit: {…} }`) rakennukseen.</summary>
        public static void LueDetaljitTiedosto(string json, Rakennus r)
            => LueDetaljit(MiniJson.ObjektiTaiNull(MiniJson.Kentta(MiniJson.ObjektiTaiNull(MiniJson.Jasenna(json)), "detaljit")), r.Detaljit);

        /// <summary>`valoatlas: { tiedosto, puoli, astc, astcPuoli, hamara: {…} }` tilaan (tilat ja kävelyosat, LR 8.10.).</summary>
        public static void LueValoAtlas(Tila t, Dictionary<string, object> valoatlas)
        {
            t.ValoAtlas = MiniJson.Teksti(valoatlas, "tiedosto");
            t.ValoAtlasPuoli = MiniJson.Teksti(valoatlas, "puoli");
            t.ValoAtlasAstc = MiniJson.Teksti(valoatlas, "astc");
            t.ValoAtlasAstcPuoli = MiniJson.Teksti(valoatlas, "astcPuoli");
            t.ValoAtlasAstcIso = MiniJson.Teksti(valoatlas, "astcIso"); t.ValoAtlasIso = MiniJson.Teksti(valoatlas, "iso");
            var hamaraAtlas = MiniJson.ObjektiTaiNull(MiniJson.Kentta(valoatlas, "hamara"));
            t.HamaraAtlas = MiniJson.Teksti(hamaraAtlas, "tiedosto"); t.HamaraAtlasPuoli = MiniJson.Teksti(hamaraAtlas, "puoli");
            t.HamaraAtlasAstc = MiniJson.Teksti(hamaraAtlas, "astc"); t.HamaraAtlasAstcPuoli = MiniJson.Teksti(hamaraAtlas, "astcPuoli");
            t.HamaraAtlasAstcIso = MiniJson.Teksti(hamaraAtlas, "astcIso"); t.HamaraAtlasIso = MiniJson.Teksti(hamaraAtlas, "iso");
        }

        static Tila LueTila(Dictionary<string, object> o)
        {
            var t = new Tila
            {
                Id = MiniJson.Teksti(o, "id"),
                Nimi = MiniJson.Teksti(o, "nimi"),
                Kohdistettava = MiniJson.Totuus(o, "kohdistettava"),
                LappuJarjestys = MiniJson.Luku(o, "lappujarjestys") is double lj ? (int)lj : (int?)null,
                Ulkona = MiniJson.Totuus(o, "ulkona"),
                Kamera = LueAsento(MiniJson.ObjektiTaiNull(MiniJson.Kentta(o, "kamera"))),
                KameraPysty = MiniJson.ObjektiTaiNull(MiniJson.Kentta(o, "kameraPysty")) is Dictionary<string, object> kp
                    ? LueAsento(kp) : (Asento?)null,
                Taulu = LueTaulu(MiniJson.ObjektiTaiNull(MiniJson.Kentta(o, "taulu"))),
            };
            var rajat = MiniJson.ObjektiTaiNull(MiniJson.Kentta(o, "rajat"));
            t.RajaMin = LueV3(MiniJson.Kentta(rajat, "min"));
            t.RajaMax = LueV3(MiniJson.Kentta(rajat, "max"));
            foreach (var n in MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(o, "naapurit"))) if (n is string s) t.Naapurit.Add(s);
            var pulu = MiniJson.ObjektiTaiNull(MiniJson.Kentta(o, "pulu"));
            t.PuluLaskeutuminen = LueV3(MiniJson.Kentta(pulu, "laskeutuminen"));
            t.Taulupuoli = MiniJson.Teksti(pulu, "taulupuoli");
            t.PuluTeksti = MiniJson.Teksti(pulu, "teksti");
            t.PuluAani = MiniJson.Teksti(pulu, "aani");
            var info = MiniJson.ObjektiTaiNull(MiniJson.Kentta(o, "infotaulu"));
            if (info != null)
            {
                t.Infotaulu = new Infotaulu { Nimi = MiniJson.Teksti(info, "nimi") };
                foreach (var ro in MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(info, "rivit")))
                {
                    if (ro is string rs) { t.Infotaulu.Rivit.Add((rs, null)); continue; }
                    var ri = MiniJson.ObjektiTaiNull(ro);
                    if (ri != null) t.Infotaulu.Rivit.Add((MiniJson.Teksti(ri, "teksti"), MiniJson.Teksti(ri, "lahde")));
                }
            }
            foreach (var ko in MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(o, "kuunnelma")))
            {
                var k = MiniJson.ObjektiTaiNull(ko);
                if (k == null || string.IsNullOrEmpty(MiniJson.Teksti(k, "teksti"))) continue;
                var kr = new KuunnelmaRivi
                {
                    Id = MiniJson.Teksti(k, "id"), Puhuja = MiniJson.Teksti(k, "puhuja"), Nimi = MiniJson.Teksti(k, "nimi"),
                    Huom = MiniJson.Teksti(k, "huom"), Teksti = MiniJson.Teksti(k, "teksti"), Aani = MiniJson.Teksti(k, "aani"),
                };
                foreach (var vo in MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(k, "vuorot")))
                {
                    var v = MiniJson.ObjektiTaiNull(vo);
                    if (v != null) kr.Vuorot.Add(new KuunnelmaVuoro { Puhuja = MiniJson.Teksti(v, "puhuja"), Teksti = MiniJson.Teksti(v, "teksti"), Ilme = MiniJson.Teksti(v, "ilme"), Ele = MiniJson.Teksti(v, "ele"),
                        AlkuS = MiniJson.Luku(v, "alku_s") ?? 0, LoppuS = MiniJson.Luku(v, "loppu_s") ?? 0 });
                }
                t.Kuunnelma.Add(kr);
            }
            foreach (var rivi in MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(o, "hahmot")))
            {
                var h = MiniJson.ObjektiTaiNull(rivi);
                if (h != null) t.Hahmot.Add(LueHahmo(h));
            }
            foreach (var rivi in MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(o, "kasikirjoitus")))
            {
                var a = MiniJson.ObjektiTaiNull(rivi);
                if (a != null) t.Kasikirjoitus.Add(LueAskel(a));
            }
            var glb = MiniJson.ObjektiTaiNull(MiniJson.Kentta(o, "glb"));
            t.GlbTiedosto = MiniJson.Teksti(glb, "tiedosto");
            foreach (var vo in MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(o, "etsinta")))
            {
                var v = MiniJson.ObjektiTaiNull(vo);
                if (v == null) continue;
                t.Etsinta.Add(new EtsintaVaihe
                {
                    Etsinta = MiniJson.Teksti(v, "etsinta"), Vaihe = (int)(MiniJson.Luku(v, "vaihe") ?? 0), Tyyppi = MiniJson.Teksti(v, "tyyppi"),
                    Kohde = LueV3(MiniJson.Kentta(v, "kohde")), Sade = MiniJson.Luku(v, "sade") ?? 0.8,
                    Teksti = MiniJson.Teksti(v, "teksti") ?? MiniJson.Teksti(MiniJson.ObjektiTaiNull(MiniJson.Kentta(v, "repliikki")), "teksti"),
                    Hahmo = MiniJson.Teksti(v, "hahmo"), Kansi = MiniJson.Teksti(v, "kansi"), Esine = MiniJson.Teksti(v, "esine"),
                    Pulu = MiniJson.Teksti(v, "pulu"), Rivi = MiniJson.Teksti(v, "rivi"),
                });
            }
            foreach (var eo in MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(o, "esineet")))
            {
                var e = MiniJson.ObjektiTaiNull(eo);
                if (e == null) continue;
                t.Esineet.Add(new Esine
                {
                    Id = MiniJson.Teksti(e, "id"), Tiedosto = MiniJson.Teksti(e, "tiedosto"), Avaa = MiniJson.Luku(e, "avaa") ?? 0,
                    Sarana = MiniJson.Kentta(e, "sarana") != null ? LueV3(MiniJson.Kentta(e, "sarana")) : (V3?)null,
                    Akseli = MiniJson.Kentta(e, "akseli") != null ? LueV3(MiniJson.Kentta(e, "akseli")) : (V3?)null,
                });
            }
            var elava = MiniJson.ObjektiTaiNull(MiniJson.Kentta(o, "elava"));
            if (elava != null)
            {
                t.Elava = new Elava
                {
                    Kohde = LueV3(MiniJson.Kentta(elava, "kohde")), Sade = MiniJson.Luku(elava, "sade") ?? 6,
                    Vihje = MiniJson.Totuus(elava, "vihje"),
                };
                var reitti = MiniJson.ObjektiTaiNull(MiniJson.Kentta(elava, "reitti"));
                if (reitti != null)
                {
                    t.Elava.Reitti = new ElavaReitti
                    {
                        Henkilo = MiniJson.Teksti(reitti, "henkilo"), Nopeus = MiniJson.Luku(reitti, "nopeus") ?? 0.8,
                        Edestakaisin = MiniJson.Totuus(reitti, "edestakaisin", true), Lyhty = MiniJson.Totuus(reitti, "lyhty"),
                    };
                    foreach (var piste in MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(reitti, "pisteet"))) t.Elava.Reitti.Pisteet.Add(LueV3(piste));
                }
                // Elävä reitti hahmoksi (sama kävelylogiikka kuin Hahmo.Reitti: edestakaisin, kasvot kulkusuuntaan);
                // lisätään tilan hahmoihin, kun Hahmot on luettu (alla, ElavaReittiHahmoksi).
            }
            var leikkaus = MiniJson.ObjektiTaiNull(MiniJson.Kentta(o, "leikkaus"));
            if (leikkaus != null)
            {
                t.LeikkausLaajennus = MiniJson.Luku(leikkaus, "laajennus") ?? 1.0;
                t.LeikkausKameraan = MiniJson.Totuus(leikkaus, "kameraan", true);
                if (MiniJson.Kentta(leikkaus, "min") != null && MiniJson.Kentta(leikkaus, "max") != null)
                {
                    t.LeikkausMin = LueV3(MiniJson.Kentta(leikkaus, "min"));
                    t.LeikkausMax = LueV3(MiniJson.Kentta(leikkaus, "max"));
                }
            }
            LueValoAtlas(t, MiniJson.ObjektiTaiNull(MiniJson.Kentta(o, "valoatlas")));
            t.GlbSha256 = MiniJson.Teksti(glb, "sha256");
            foreach (var rivi in MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(o, "liekit")))
            {
                var l = MiniJson.ObjektiTaiNull(rivi);
                if (l != null) t.Liekit.Add(new LiekkiPaikka { LiekkiId = MiniJson.Teksti(l, "liekki"),
                    Paikka = LueV3(MiniJson.Kentta(l, "paikka")), Koko = MiniJson.Luku(l, "koko") ?? 1,
                    Vaihe = MiniJson.Luku(l, "vaihe") ?? 0 });
            }
            foreach (var rivi in MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(o, "aanet")))
            {
                var a = MiniJson.ObjektiTaiNull(rivi);
                if (a != null) t.Aanet.Add(new AaniPaikka { AaniId = MiniJson.Teksti(a, "aani"),
                    Voimakkuus = MiniJson.Luku(a, "voimakkuus") ?? 1 });
            }
            foreach (var rivi in MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(o, "valot")))
            {
                var v = MiniJson.ObjektiTaiNull(rivi);
                if (v != null) t.Valot.Add(new Valo { Paikka = LueV3(MiniJson.Kentta(v, "paikka")),
                    Sade = MiniJson.Luku(v, "sade") ?? 0, Voima = MiniJson.Luku(v, "voima") ?? 0,
                    Vari = MiniJson.Teksti(v, "vari"), Lepatus = MiniJson.Luku(v, "lepatus") ?? 0,
                    Tyyppi = MiniJson.Teksti(v, "tyyppi") ?? "piste",
                    // era 2b, ikkunan aurinko: kohti puuttuu "piste"-tyypin valoilta -> Kohti pysyy nullina.
                    Kohti = MiniJson.Kentta(v, "kohti") is List<object> kohtiLista ? LueV3(kohtiLista) : (V3?)null,
                    Kulma = MiniJson.Luku(v, "kulma") ?? 0 });
            }
            foreach (var rivi in MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(o, "tehosteet")))
            {
                var te = MiniJson.ObjektiTaiNull(rivi);
                if (te == null) continue;
                var jakso = new TehosteJakso { Voimakkuus = MiniJson.Luku(te, "voimakkuus") ?? 1 };
                foreach (var id in MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(te, "aanet"))) if (id is string s) jakso.AaniIdt.Add(s);
                var valit = MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(te, "valit_s"));
                jakso.ValiMin = valit.Count > 0 && valit[0] is double vmin ? vmin : 0;
                jakso.ValiMax = valit.Count > 1 && valit[1] is double vmax ? vmax : 0;
                t.Tehosteet.Add(jakso);
            }
            return t;
        }

        static Henkilo LueHenkilo(string id, Dictionary<string, object> o)
        {
            var h = new Henkilo
            {
                Id = id,
                Nimi = MiniJson.Teksti(o, "nimi"),
                Atlas = MiniJson.Teksti(o, "atlas"),
                Sarakkeet = (int)(MiniJson.Luku(o, "sarakkeet") ?? 0),
                KorkeusM = MiniJson.Luku(o, "korkeus_m") ?? 0,
                PxPerM = MiniJson.Luku(o, "px_per_m") ?? 0,
            };
            var ruutu = MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(o, "ruutu"));
            h.RuutuL = ruutu.Count > 0 && ruutu[0] is double rl ? (int)rl : 0;
            h.RuutuK = ruutu.Count > 1 && ruutu[1] is double rk ? (int)rk : 0;
            var pivot = MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(o, "pivot"));
            h.PivotX = pivot.Count > 0 && pivot[0] is double px ? px : 0;
            h.PivotY = pivot.Count > 1 && pivot[1] is double py ? py : 0;
            foreach (var pari in MiniJson.ObjektiTaiNull(MiniJson.Kentta(o, "silmukat")) ?? new Dictionary<string, object>())
            {
                var s = MiniJson.ObjektiTaiNull(pari.Value);
                if (s != null)
                    h.Silmukat[pari.Key] = new Silmukka { Rivi = (int)(MiniJson.Luku(s, "rivi") ?? 0),
                        Ruudut = (int)(MiniJson.Luku(s, "ruudut") ?? 0), Fps = (int)(MiniJson.Luku(s, "fps") ?? 0) };
            }
            h.Malli3d = LueMalli3d(MiniJson.ObjektiTaiNull(MiniJson.Kentta(o, "malli3d")));
            return h;
        }

        /// <summary>Lukee henkilön valinnaisen malli3d-kentän (era 2b, kohta 4 "HENKILOT.malli3d"). Palauttaa
        /// null, jos lähteessä ei ole malli3d-oliota lainkaan (2D-atlashahmo jatkuu).</summary>
        internal static Malli3d LueMalli3d(Dictionary<string, object> o)
        {
            if (o == null) return null;
            var m = new Malli3d { Esine = MiniJson.Teksti(o, "esine"), Glb = MiniJson.Teksti(o, "glb") };
            var mitat = MiniJson.ObjektiTaiNull(MiniJson.Kentta(o, "mittasuhteet"));
            if (mitat != null) m.Mittasuhteet = new Mittasuhteet { PituusM = MiniJson.Luku(mitat, "pituus_m") ?? 0,
                HartiatM = MiniJson.Luku(mitat, "hartiat_m") ?? 0, LantioM = MiniJson.Luku(mitat, "lantio_m") ?? 0,
                PaaM = MiniJson.Luku(mitat, "paa_m") ?? 0 };
            var vaatteet = MiniJson.ObjektiTaiNull(MiniJson.Kentta(o, "vaatteet"));
            if (vaatteet != null) m.Vaatteet = new Vaatteet { Paita = MiniJson.Teksti(vaatteet, "paita"),
                Housut = MiniJson.Teksti(vaatteet, "housut"), Hame = MiniJson.Teksti(vaatteet, "hame"),
                Esiliina = MiniJson.Teksti(vaatteet, "esiliina"), Paahine = MiniJson.Teksti(vaatteet, "paahine") };
            foreach (var pari in MiniJson.ObjektiTaiNull(MiniJson.Kentta(o, "varit")) ?? new Dictionary<string, object>())
                if (pari.Value is string vari) m.Varit[pari.Key] = vari;
            var skin = MiniJson.ObjektiTaiNull(MiniJson.Kentta(o, "skin"));
            if (skin != null && !string.IsNullOrEmpty(MiniJson.Teksti(skin, "glb")))
            {
                m.Skin = new SkinMalli { Glb = MiniJson.Teksti(skin, "glb"), Faceit = MiniJson.Teksti(skin, "faceit"), KavelySykliM = MiniJson.Luku(skin, "kavely_sykli_m") ?? 0,
                    Skaala = MiniJson.Luku(skin, "skaala") ?? 1 };
                foreach (var pari in MiniJson.ObjektiTaiNull(MiniJson.Kentta(skin, "leikkeet")) ?? new Dictionary<string, object>())
                    if (pari.Value is string leike) m.Skin.Leikkeet[pari.Key] = leike;
            }
            return m;
        }

        static Hahmo LueHahmo(Dictionary<string, object> o)
        {
            var h = new Hahmo
            {
                Id = MiniJson.Teksti(o, "id"),
                HenkiloId = MiniJson.Teksti(o, "henkilo"),
                Paikka = LueV3(MiniJson.Kentta(o, "paikka")),
                Suunta = MiniJson.Luku(o, "suunta") ?? 0,
                Peilattu = MiniJson.Totuus(o, "peilattu"),
                Silmukka = MiniJson.Teksti(o, "silmukka"),
                Heraa = (int)(MiniJson.Luku(o, "heraa") ?? 0),
                Lyhty = MiniJson.Totuus(o, "lyhty"),
            };
            var reitti = MiniJson.ObjektiTaiNull(MiniJson.Kentta(o, "reitti"));
            if (reitti != null)
            {
                var re = new Reitti { Nopeus = MiniJson.Luku(reitti, "nopeus") ?? 0, Tauko = MiniJson.Luku(reitti, "tauko") ?? 0 };
                foreach (var p in MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(reitti, "pisteet"))) re.Pisteet.Add(LueV3(p));
                h.Reitti = re;
            }
            foreach (var rivi in MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(o, "repliikit")))
            {
                var rp = MiniJson.ObjektiTaiNull(rivi);
                if (rp != null) h.Repliikit.Add(LueRepliikki(rp));
            }
            var reaktio = MiniJson.ObjektiTaiNull(MiniJson.Kentta(o, "reaktio"));
            if (reaktio != null) h.Reaktio = LueRepliikki(reaktio);
            foreach (var rivi in MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(o, "kadet")))
            {
                var k = MiniJson.ObjektiTaiNull(rivi);
                if (k == null) continue;
                var kk = new KasiKohde
                {
                    Tyyppi = MiniJson.Teksti(k, "tyyppi") ?? "tartu",
                    Esine = MiniJson.Teksti(k, "esine"),
                    Kasi = MiniJson.Teksti(k, "kasi") == "l" ? "l" : "r",
                    Milloin = MiniJson.Teksti(k, "milloin") ?? "aina",
                    Paino = Math.Clamp(MiniJson.Luku(k, "paino") ?? 1, 0, 1),
                    Paikka = LueV3(MiniJson.Kentta(k, "paikka")),
                    Siirto = LueV3(MiniJson.Kentta(k, "siirto")),
                };
                var q = MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(k, "kierto"));
                if (q.Count == 4 && q.TrueForAll(x => x is double)) kk.Kierto = new[] { (double)q[0], (double)q[1], (double)q[2], (double)q[3] };
                h.Kadet.Add(kk);
            }
            return h;
        }

        static Repliikki LueRepliikki(Dictionary<string, object> o) =>
            new Repliikki { Id = MiniJson.Teksti(o, "id"), Teksti = MiniJson.Teksti(o, "teksti"), Aani = MiniJson.Teksti(o, "aani") };

        static Askel LueAskel(Dictionary<string, object> o) => new Askel
        {
            Tee = MiniJson.Teksti(o, "tee"),
            N = (int)(MiniJson.Luku(o, "n") ?? 0),
            HahmoId = MiniJson.Teksti(o, "hahmo"),
            S = MiniJson.Luku(o, "s") ?? 0,
        };
    }
}
