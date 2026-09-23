// LINSSIOMISTUS: kuka omistaa minkäkin linssin, mistä linssi löytyy ja mihin
// löytö jää talteen. Suora portti verkkopelin js/linssit/omistus.js:stä
// (hiomassa, hiomassaNimi, omistetut, omistaa, myonna, hyvitaHiomassa,
// hiomassaOlevat, valmistuneet, merkitseLinssiNahdyksi, linssiKaupungista,
// tarkistaKynnys, laattamantereet) ja sitä kutsuvista js/game.js-kohdista
// (tarkistaLinssikynnys, linssiAarteenKylkiaisena), sekä js/linssit/
// aarteet.js:n linssiAarteesta. Kultainen jälki Kultaiset/linssijalki.json
// (Kultaiset/tee-linssijalki.mjs, testi Testit/LinssiomistusTestit.cs).
//
// OMISTUS ON KAHDEN VARASTON UNIONI (web): 1) passin leimat 'linssi:<tunnus>'
// (Peli/Passi.cs, säilyvät pelikerrasta toiseen) ja 2) pelaajan tämän matkan
// linssit (Linssitila, pelitallennuksessa; web player.linssit). "Kerran nähtyä
// maailmaa ei oteta pois": kerran löydetty linssi toimii uudessakin pelissä.
// Lisäksi peruslinssit (pallo) ja kehittäjätilassa kaikki toimivat linssit.
//
// KYTKENTÄ: new Linssiomistus(passi, linssitila).Kytke(matka) asettaa
// Matka.LinssiKylkiaisena- ja Kokemus.KynnysYlitetty-koukut ja kuuntelee
// Matka.Loysi-tapahtumaa (seitsemän peninkulman linssi). Latauksen jälkeen
// luodaan uusi Linssiomistus ladatulle Matkalle kuten Kaupat. Linssiseppä
// kytkee näkymien ehdon: Linssirekisteri.Omistaa = omistus.Omistaa.
//
// SEITSEMÄN PENINKULMAN LINSSI (Raamattu "Pelin kulku": 80 päivän palkinto;
// ei webissä): kun seitsemäs pääaarre löytyy ja Pelitila.Paiva() <= 80,
// pelaaja saa linssin Peninkulma. Sen jälkeen Omistaa(mikä tahansa) on tosi
// (kaikki linssit auki), linssiä ei voi ostaa, ja VapaaSiirtyminen vie mihin
// tahansa kaupunkiin ilman noppaa ja maksutta (vie vuoron kuten lento).
//
// POIKKEAMAT: web leimaa valmiin linssin passiin asynkronisesti linssimoduulin
// nimellä (leimaaPassiin); täällä leimaus on heti, ja nimi tulee koukusta
// LinssinNimi (Linssiseppä), muuten rekisterin nimestä tai tunnuksesta. Web
// say-lokirivit ja emit-tapahtumat kulkevat Myonsi-tapahtumana
// (LinssiMyonto: Teksti = say, Otsikko/Alaotsikko/Tilanne = emit) ja
// Matka.Tapahtui-tapahtumana ('aid', say-rivi) kuten Kaupat.
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;

namespace Matkakirja.Peli
{
    /// <summary>Linssirekisterin rivi (web js/linssit/rekisteri.js LINSSIT[i]): vain logiikan tarvitsemat kentät.</summary>
    public sealed class Linssirivi
    {
        public string Tunnus;
        /// <summary>Manner, jolle linssi kuuluu; null = tietäjäpistekynnysten linssi.</summary>
        public string Manner;
        /// <summary>Web tila: 'hiomassa' — linssi on palkkio mutta ei vielä toimi.</summary>
        public bool Hiomassa;
        /// <summary>Hiomassa-linssin nimi rekisterissä (web nimi); valmiin nimi asuu linssissä itsessään.</summary>
        public string Nimi;
    }

    /// <summary>Linssin myöntö (web {tunnus, hiomassa, hyvitys} + say- ja emit-tekstit).</summary>
    public sealed class LinssiMyonto
    {
        public string Tunnus;
        public bool Hiomassa;
        /// <summary>Maksettu optikon hyvitys (0 = ei maksettu).</summary>
        public int Hyvitys;
        /// <summary>Web emit text: 'Uusi linssi' tai 'Linssi hiomassa'.</summary>
        public string Otsikko;
        /// <summary>Web emit sub.</summary>
        public string Alaotsikko;
        /// <summary>Web emit tilanne (Livian/pöllön repliikin avain).</summary>
        public string Tilanne;
        /// <summary>Web say-lokirivi.</summary>
        public string Teksti;
    }

    /// <summary>
    /// Linssien pelikohtainen tila (web player.linssit): tällä matkalla
    /// löydetyt linssit pelaajittain myöntöjärjestyksessä. Tallennetaan
    /// pelitilaan (ks. Kirjoita); passi on erikseen.
    /// </summary>
    public sealed class Linssitila
    {
        public readonly Dictionary<int, List<string>> Pelaajat = new Dictionary<int, List<string>>();

        /// <summary>Pelaajan lista (web player.linssit ??= []).</summary>
        public List<string> Linssit(int pelaajaId)
        {
            if (!Pelaajat.TryGetValue(pelaajaId, out var l)) Pelaajat[pelaajaId] = l = new List<string>();
            return l;
        }

        /// <summary>Sama JSON kuin tallennuksen kentässä linssit: {"&lt;pelaajaId&gt;":["tunnus",…]}.</summary>
        public string Json()
        {
            var sb = new StringBuilder();
            Kirjoita(sb);
            return sb.ToString();
        }

        public void Kirjoita(StringBuilder sb)
        {
            sb.Append('{');
            bool eka = true;
            foreach (var kv in Pelaajat.Where(kv => kv.Value.Count > 0).OrderBy(kv => kv.Key))
            {
                if (!eka) sb.Append(',');
                eka = false;
                sb.Append('"').Append(kv.Key.ToString(CultureInfo.InvariantCulture)).Append("\":[")
                    .Append(string.Join(",", kv.Value.Select(Pelitila.Teksti))).Append(']');
            }
            sb.Append('}');
        }

        /// <summary>Puuttuva olio (vanha tallennus) = tyhjä tila, kuten web fromJSON (linssit: []).</summary>
        public static Linssitila Lue(Dictionary<string, object> o)
        {
            var t = new Linssitila();
            if (o == null) return t;
            foreach (var kv in o)
            {
                if (!int.TryParse(kv.Key, NumberStyles.Integer, CultureInfo.InvariantCulture, out var id)) continue;
                if (!(kv.Value is List<object> l)) continue;
                var lista = t.Linssit(id);
                foreach (var x in l) if (x is string s && !lista.Contains(s)) lista.Add(s);
            }
            return t;
        }
    }

    public sealed class Linssiomistus
    {
        // --- vakiot (js/linssit/omistus.js) ------------------------------------

        /// <summary>Web LEIMA_ETULIITE: passin linssileima 'linssi:&lt;tunnus&gt;'.</summary>
        public const string LeimaEtuliite = "linssi:";
        /// <summary>Web HYVITYS_ETULIITE: optikon hyvitys maksettu (kerran per linssi).</summary>
        public const string HyvitysEtuliite = "hyvitys:";
        /// <summary>Web NAHTY_ETULIITE: valmistunut linssi nähty laukussa.</summary>
        public const string NahtyEtuliite = "nahty:";
        /// <summary>Web OPTIKON_HYVITYS: keskeneräisen linssin löytäjälle, ei tietäjäpisteitä.</summary>
        public const int OptikonHyvitys = 500;
        /// <summary>Web LINSSIKYNNYKSET: tietäjäpisteiden löytöreitti.</summary>
        public static readonly IReadOnlyList<int> Kynnykset = new[] { 400, 800, 1400, 2200 };
        /// <summary>Web PERUSLINSSIT: omistettu heti (karttapallo on navigointiväline).</summary>
        public static readonly IReadOnlyList<string> Peruslinssit = new[] { "pallo" };

        /// <summary>
        /// Seitsemän peninkulman linssin tunnus. PERUSTELU: rekisterin tunnukset
        /// ovat yhden sanan pieniä kirjaimia ilman ääkkösiä (pallo, radio,
        /// topografia); "peninkulma" on linssin nimen tunnistettava ydin ja
        /// kulkee sellaisenaan passin avaimessa 'linssi:peninkulma'.
        /// </summary>
        public const string Peninkulma = "peninkulma";
        public const string PeninkulmaNimi = "Seitsemän peninkulman linssi";
        /// <summary>Pääaarteita linssiin (seitsemän mannerta = pelin loppu).</summary>
        public const int PeninkulmaAarteet = 7;
        /// <summary>Viimeinen päivä, jona seitsemäs pääaarre antaa linssin (80 päivän palkinto, sama raja kuin isoisän ennätys).</summary>
        public const int PeninkulmaPaivat = LaattaVakiot.EnnatysPaivat;

        /// <summary>
        /// Web LINSSIT (js/linssit/rekisteri.js) aakkos-/rekisterijärjestyksessä:
        /// vain avatut rivit. Järjestys ratkaisee kynnyslinssien ja
        /// linssiKaupungista-varalinssien järjestyksen. LinssiomistusTestit
        /// vaatii, että taulu on sama kuin kultaisen jäljen tuotantorekisteri.
        /// </summary>
        public static readonly IReadOnlyList<Linssirivi> Oletusrekisteri = new[]
        {
            new Linssirivi { Tunnus = "ihmisen-matka" },
            new Linssirivi { Tunnus = "keksinnot" },
            new Linssirivi { Tunnus = "pallo" },
            new Linssirivi { Tunnus = "radio" },
            new Linssirivi { Tunnus = "satelliitti" },
            new Linssirivi { Tunnus = "topografia", Manner = "southamerica" },
            new Linssirivi { Tunnus = "vertailu" },
            new Linssirivi { Tunnus = "maatiedot" },
            new Linssirivi { Tunnus = "vesistot" },
        };

        /// <summary>Web LINSSIAARTEET (js/linssit/aarteet.js): tuotannossa tyhjä (Fablen rajaus 21.9.2026).</summary>
        public static readonly IReadOnlyDictionary<string, string> Oletusaarteet = new Dictionary<string, string>();

        // --- tila ------------------------------------------------------------

        public Passi Passi { get; }
        public Linssitila Tila { get; }
        public IReadOnlyList<Linssirivi> Rekisteri { get; }
        /// <summary>Kytketty matka (Kytke). Ilman matkaa omistus lukee vain passin ja peruslinssit.</summary>
        public Matka Matka { get; private set; }

        /// <summary>Ankkurikaupunki → linssin tunnus (web game.linssiAarteet ?? LINSSIAARTEET).</summary>
        public IReadOnlyDictionary<string, string> Aarteet = Oletusaarteet;

        /// <summary>Kehittäjätila (web localStorage 'matkakirja-kehittaja'): kaikki TOIMIVAT linssit omistettuina.</summary>
        public bool Kehittajatila;

        /// <summary>
        /// Valmiin linssin nimi passin leimaan (web LINSSI.nimi linssimoduulista).
        /// Linssiseppä kytkee Linssirekisterin nimet; null tai tyhjä → rekisterin nimi tai tunnus.
        /// </summary>
        public Func<string, string> LinssinNimi;

        /// <summary>
        /// Kynnyssääntö (omistetut, ennen, jälkeen) → myönnettävät tunnukset järjestyksessä.
        /// null = webin tarkistaKynnys (WebKynnys). Linssiseppä voi antaa omistajan säännön
        /// (Linssirekisteri.Kynnys); palautettujen tunnusten on oltava Rekisterissä.
        /// </summary>
        public Func<IEnumerable<string>, int, int, IReadOnlyList<string>> Kynnyssaanto;

        /// <summary>Linssi myönnettiin (kynnys, aarteen kylkiäinen tai peninkulma).</summary>
        public event Action<Pelaaja, LinssiMyonto> Myonsi;

        public Linssiomistus(Passi passi, Linssitila tila = null, IReadOnlyList<Linssirivi> rekisteri = null)
        {
            Passi = passi ?? throw new ArgumentNullException(nameof(passi));
            Tila = tila ?? new Linssitila();
            Rekisteri = rekisteri ?? Oletusrekisteri;
        }

        /// <summary>
        /// Kytkee koukut matkaan: Matka.LinssiKylkiaisena (web linssiAarteenKylkiaisena),
        /// Kokemus.KynnysYlitetty (web tarkistaLinssikynnys) ja Matka.Loysi (peninkulma).
        /// Kutsutaan kerran per matka.
        /// </summary>
        public Linssiomistus Kytke(Matka matka)
        {
            Matka = matka ?? throw new ArgumentNullException(nameof(matka));
            matka.LinssiKylkiaisena += (p, kaupunki, tyyppi) => Kylkiainen(p, kaupunki, tyyppi);
            matka.Kokemus.KynnysYlitetty += TarkistaLinssikynnys;
            matka.Loysi += PeninkulmaLoydosta;
            return this;
        }

        Pelaaja Vuorossa => Matka?.Tila.Pelaaja;

        Linssirivi Rivi(string tunnus) => tunnus == null ? null : Rekisteri.FirstOrDefault(r => r.Tunnus == tunnus);

        List<string> PelaajanLinssit(Pelaaja p) => p == null ? new List<string>() : Tila.Linssit(p.Id);

        // --- kyselyt -----------------------------------------------------------

        /// <summary>Web hiomassa: onko linssi rekisterissä vasta hiomassa.</summary>
        public bool Hiomassa(string tunnus) => Rivi(tunnus)?.Hiomassa == true;

        /// <summary>Web hiomassaNimi: hiomassa-linssin nimi rekisteristä, muuten null.</summary>
        public string HiomassaNimi(string tunnus)
        {
            var r = Rivi(tunnus);
            return r != null && r.Hiomassa ? r.Nimi ?? r.Tunnus : null;
        }

        /// <summary>Passiin leimatut linssit (web passinLinssit), passin järjestyksessä.</summary>
        public List<string> PassinLinssit() =>
            Passi.Avaimet.Where(a => a.StartsWith(LeimaEtuliite, StringComparison.Ordinal))
                .Select(a => a.Substring(LeimaEtuliite.Length)).ToList();

        /// <summary>
        /// Web omistetut: passi ∪ peruslinssit ∪ pelaajan lista ∪ (kehittäjätila: toimivat).
        /// Peninkulman omistajalle lisäksi koko rekisteri. p = null: vuorossa oleva.
        /// </summary>
        public List<string> Omistetut(Pelaaja p = null)
        {
            p ??= Vuorossa;
            var ulos = new List<string>();
            void Lisaa(string t) { if (!ulos.Contains(t)) ulos.Add(t); }
            foreach (var t in PassinLinssit()) Lisaa(t);
            foreach (var t in Peruslinssit) Lisaa(t);
            if (p != null && Tila.Pelaajat.TryGetValue(p.Id, out var oma)) foreach (var t in oma) Lisaa(t);
            // Kehittäjätila antaa vain TOIMIVAT linssit (omistaja 4.8.2026), ei hiomassa olevia.
            if (Kehittajatila) foreach (var r in Rekisteri) if (!r.Hiomassa) Lisaa(r.Tunnus);
            if (ulos.Contains(Peninkulma)) foreach (var r in Rekisteri) Lisaa(r.Tunnus);
            return ulos;
        }

        /// <summary>
        /// Web omistaa: vuorossa olevan pelaajan omistus. Linssiseppä kytkee tämän
        /// Linssirekisteri.Omistaa-kenttään. Peninkulman omistajalle aina tosi.
        /// </summary>
        public bool Omistaa(string tunnus) => Omistaa(null, tunnus);

        public bool Omistaa(Pelaaja p, string tunnus)
        {
            if (string.IsNullOrEmpty(tunnus)) return false;
            var omat = Omistetut(p);
            return omat.Contains(tunnus) || omat.Contains(Peninkulma);
        }

        /// <summary>Web hiomassaOlevat: omistetut, jotka ovat vielä hiomassa (laukun harmaa rivi).</summary>
        public List<string> HiomassaOlevat(Pelaaja p = null) => Omistetut(p).Where(Hiomassa).ToList();

        /// <summary>
        /// Web valmistuneet: hyvitetty linssi, joka on nyt valmis mutta jota ei
        /// ole nähty laukussa. Laukku kuittaa merkin MerkitseNahdyksi-kutsulla.
        /// </summary>
        public List<string> Valmistuneet(Pelaaja p = null) =>
            Omistetut(p).Where(t => !Hiomassa(t)
                && Passi.Leimattu(HyvitysEtuliite + t) && !Passi.Leimattu(NahtyEtuliite + t)).ToList();

        /// <summary>
        /// Voiko linssin ostaa (Raamattu: varusteet ostetaan kaupasta; kauppaa ei
        /// ole vielä webissäkään). Ei: tuntematon, hiomassa, jo omistettu tai
        /// peninkulma ("ei ostettavissa, vain ansaitsemalla").
        /// </summary>
        public bool Ostettavissa(string tunnus, Pelaaja p = null)
        {
            var r = Rivi(tunnus);
            return r != null && !r.Hiomassa && tunnus != Peninkulma && !Omistaa(p, tunnus);
        }

        /// <summary>Web laattamantereet: mantereet, joilla on oma linssi, rekisterijärjestyksessä.</summary>
        public List<string> Laattamantereet()
        {
            var ulos = new List<string>();
            foreach (var r in Rekisteri) if (r.Manner != null && !ulos.Contains(r.Manner)) ulos.Add(r.Manner);
            return ulos;
        }

        /// <summary>
        /// Web linssiKaupungista: kaupungin oman mantereen linssi, jos omistamaton;
        /// muuten ensimmäinen omistamaton mannerlinssi, sitten ensimmäinen
        /// omistamaton kynnyslinssi. null = ei annettavaa. Vaatii kytketyn matkan
        /// (manner verkosta; tuntematon kaupunki → laudan tunnus kuten web pack.id).
        /// </summary>
        public string LinssiKaupungista(string kaupunki, Pelaaja p = null)
        {
            if (Matka == null) throw new InvalidOperationException("Linssiomistus ei ole kytketty matkaan");
            var manner = kaupunki != null && Matka.Verkko.Kaupungit.TryGetValue(kaupunki, out var k) && k.Manner != null
                ? k.Manner : Matka.Laatat?.LautaId ?? "maailmankartta";
            var omat = Omistetut(p);
            var oma = Rekisteri.FirstOrDefault(r => r.Manner == manner);
            if (oma != null && !omat.Contains(oma.Tunnus)) return oma.Tunnus;
            return EnsimmainenOmistamaton(omat, r => r.Manner != null)
                ?? EnsimmainenOmistamaton(omat, r => r.Manner == null);
        }

        string EnsimmainenOmistamaton(ICollection<string> omat, Func<Linssirivi, bool> ehto) =>
            Rekisteri.FirstOrDefault(r => ehto(r) && !omat.Contains(r.Tunnus))?.Tunnus;

        // --- teot ------------------------------------------------------------

        /// <summary>
        /// Web myonna: linssi pelaajalle (pelikerran lista) ja passiin. Palauttaa
        /// (uusi, tunnus): uusi = linssi oli ennestään tuntematon; tuntematon
        /// tunnus → (false, null).
        /// </summary>
        public (bool Uusi, string Tunnus) Myonna(Pelaaja p, string tunnus)
        {
            var r = Rivi(tunnus);
            if (r == null) return (false, null);
            return MyonnaRivi(p, r.Tunnus, r.Hiomassa ? r.Nimi ?? r.Tunnus : ValmiinNimi(r));
        }

        (bool, string) MyonnaRivi(Pelaaja p, string tunnus, string leimanimi)
        {
            bool passissa = Passi.Leimattu(LeimaEtuliite + tunnus);
            var lista = PelaajanLinssit(p);
            bool uusi = !passissa && !lista.Contains(tunnus);
            if (!lista.Contains(tunnus)) lista.Add(tunnus);
            if (!passissa) Passi.Leimaa(LeimaEtuliite + tunnus, leimanimi);
            return (uusi, tunnus);
        }

        string ValmiinNimi(Linssirivi r)
        {
            var n = LinssinNimi?.Invoke(r.Tunnus);
            return string.IsNullOrEmpty(n) ? r.Nimi ?? r.Tunnus : n;
        }

        /// <summary>
        /// Web hyvitaHiomassa: optikon hyvitys hiomassa olevasta linssistä kerran
        /// per linssi (passi 'hyvitys:&lt;tunnus&gt;'). Palauttaa maksetun summan tai 0.
        /// </summary>
        public int HyvitaHiomassa(Pelaaja p, string tunnus)
        {
            if (!Hiomassa(tunnus) || p == null) return 0;
            var avain = HyvitysEtuliite + tunnus;
            if (Passi.Leimattu(avain)) return 0;
            if (!Passi.Leimaa(avain, "Optikon hyvitys: " + HiomassaNimi(tunnus))) return 0;
            p.Raha += OptikonHyvitys;
            return OptikonHyvitys;
        }

        /// <summary>Web merkitseLinssiNahdyksi: valmistunut linssi nähty laukussa. Tosi, jos merkintä on uusi.</summary>
        public bool MerkitseNahdyksi(string tunnus) => Passi.Leimaa(NahtyEtuliite + tunnus, "Linssi nähty: " + tunnus);

        /// <summary>
        /// Web tarkistaKynnys: jokainen ylitetty raja (vain kerran: vertailu ennen/jälkeen)
        /// antaa ensimmäisen omistamattoman kynnyslinssin (manner null). Palauttaa
        /// myönnetyt tunnukset. Sääntö vaihdettavissa (Kynnyssaanto).
        /// </summary>
        public List<string> TarkistaKynnys(Pelaaja p, int ennen, int jalkeen)
        {
            var saanto = Kynnyssaanto ?? WebKynnys;
            var uudet = new List<string>();
            foreach (var tunnus in saanto(Omistetut(p), ennen, jalkeen) ?? Array.Empty<string>())
            {
                if (Myonna(p, tunnus).Tunnus == null) continue; // ei rekisterissä
                uudet.Add(tunnus);
            }
            return uudet;
        }

        /// <summary>Webin kynnyssääntö (tarkistaKynnys) tämän rekisterin kynnyslinsseillä.</summary>
        public IReadOnlyList<string> WebKynnys(IEnumerable<string> omistetut, int ennen, int jalkeen)
        {
            var uudet = new List<string>();
            if (jalkeen <= ennen) return uudet;
            var omat = new HashSet<string>(omistetut ?? Enumerable.Empty<string>());
            foreach (var raja in Kynnykset)
            {
                if (ennen >= raja || jalkeen < raja) continue;
                var tunnus = EnsimmainenOmistamaton(omat, r => r.Manner == null);
                if (tunnus == null) break; // kaikki kynnyslinssit on jo löydetty
                omat.Add(tunnus);
                uudet.Add(tunnus);
            }
            return uudet;
        }

        /// <summary>Web tarkistaLinssikynnys (Kokemus.KynnysYlitetty): myöntö, say ja emit per linssi.</summary>
        public void TarkistaLinssikynnys(Pelaaja p, int ennen, int jalkeen)
        {
            foreach (var tunnus in TarkistaKynnys(p, ennen, jalkeen))
                Ilmoita(p, new LinssiMyonto
                {
                    Tunnus = tunnus,
                    Otsikko = "Uusi linssi",
                    Alaotsikko = "Kokemus avasi uuden katselutavan",
                    Tilanne = "peli.linssi.avautui",
                    Teksti = $"{p.Nimi} on nähnyt maailmaa niin paljon, että sai uuden linssin ({jalkeen} tp).",
                });
        }

        /// <summary>Web linssiAarteesta: vain iso paikallisaarre antaa linssin (Aarteet-taulusta).</summary>
        public string LinssiAarteesta(string kaupunki, string tyyppi)
        {
            if (tyyppi != Laattatyypit.IsoAarre || string.IsNullOrEmpty(kaupunki)) return null;
            return Aarteet != null && Aarteet.TryGetValue(kaupunki, out var t) ? t : null;
        }

        /// <summary>
        /// Web linssiAarteenKylkiaisena (Matka.LinssiKylkiaisena): ison aarteen linssi.
        /// Hiomassa oleva tuo optikon hyvityksen kerran. Toisella pelikerralla linssi
        /// on jo passissa eikä uusi: silloin null (ei kuplaa eikä hyvitystä).
        /// </summary>
        public LinssiMyonto Kylkiainen(Pelaaja p, string kaupunki, string tyyppi)
        {
            var tunnus = LinssiAarteesta(kaupunki, tyyppi);
            if (tunnus == null) return null;
            if (!Myonna(p, tunnus).Uusi) return null;
            if (Hiomassa(tunnus))
            {
                int hyvitys = HyvitaHiomassa(p, tunnus);
                var nimi = HiomassaNimi(tunnus);
                return Ilmoita(p, new LinssiMyonto
                {
                    Tunnus = tunnus,
                    Hiomassa = true,
                    Hyvitys = hyvitys,
                    Otsikko = "Linssi hiomassa",
                    Alaotsikko = hyvitys != 0
                        ? $"Optikko hioo vielä tätä linssiä — hän maksoi odotuksesta {hyvitys} puntaa hyvitystä. Linssi tulee laukkuun, kun se on valmis."
                        : "Optikko hioo vielä tätä linssiä. Linssi tulee laukkuun, kun se on valmis.",
                    Tilanne = "peli.linssi.hiomassa",
                    Teksti = $"{p.Nimi} löysi aarteen kyljestä linssin ({nimi}), mutta optikko hioo sitä vielä"
                        + (hyvitys != 0 ? $" — hän maksoi odotuksesta {hyvitys} puntaa hyvitystä." : "."),
                });
            }
            return Ilmoita(p, new LinssiMyonto
            {
                Tunnus = tunnus,
                Otsikko = "Uusi linssi",
                Alaotsikko = "Aarteen kyljessä oli linssi — uusi katselutapa laukkuun",
                Tilanne = "peli.linssi.avautui",
                Teksti = $"{p.Nimi} löysi aarteen kyljestä linssin.",
            });
        }

        LinssiMyonto Ilmoita(Pelaaja p, LinssiMyonto m)
        {
            Matka?.Ilmoita("aid", m.Teksti);
            Myonsi?.Invoke(p, m);
            return m;
        }

        // --- seitsemän peninkulman linssi (ei webissä) ------------------------

        /// <summary>Pelaajan löytämät pääaarteet (web finds; tunnistenimistä riippumaton laskenta).</summary>
        public static int Paaaarteita(Pelaaja p) => p?.Loydot.Count(t => t == Laattatyypit.Paaaarre) ?? 0;

        void PeninkulmaLoydosta(Pelaaja p, Loyto l)
        {
            if (l == null || l.Tyyppi != Laattatyypit.Paaaarre) return;
            TarkistaPeninkulma(p);
        }

        /// <summary>
        /// Myöntää seitsemän peninkulman linssin, jos pelaajalla on vähintään seitsemän
        /// pääaarretta ja päivä on enintään 80 eikä linssiä vielä ole. Kutsutaan
        /// pääaarteen löydöstä (Matka.Loysi); palauttaa myönnön tai null.
        /// </summary>
        public LinssiMyonto TarkistaPeninkulma(Pelaaja p = null)
        {
            p ??= Vuorossa;
            if (p == null || Matka == null) return null;
            if (Paaaarteita(p) < PeninkulmaAarteet) return null;
            int paiva = Matka.Tila.Paiva();
            if (paiva > PeninkulmaPaivat) return null;
            // Pelikohtainen (Fable 23.9.): passin leima pitää linssit auki myöhemmissäkin peleissä,
            // mutta vapaa siirtyminen ansaitaan joka pelissä uudelleen.
            if (PelaajanLinssit(p).Contains(Peninkulma)) return null;
            MyonnaRivi(p, Peninkulma, PeninkulmaNimi);
            return Ilmoita(p, new LinssiMyonto
            {
                Tunnus = Peninkulma,
                Otsikko = PeninkulmaNimi,
                Alaotsikko = "Alle 80 päivän matka: vapaa siirtyminen mihin tahansa kaupunkiin ilman noppaa, ja kaikki linssit ovat auki",
                Tilanne = "peli.linssi.peninkulma",
                Teksti = $"{p.Nimi} löysi seitsemännen unohdetun aarteen {paiva}. päivänä ja sai seitsemän peninkulman linssin.",
            });
        }

        /// <summary>
        /// Vaihe sallii vapaan siirtymisen: Toiminta, tai Heitto ennen heittoa (vuoron
        /// alun automaattivalinta tai pelaajan valitsema noppatapa, kuten bussi).
        /// </summary>
        static bool VapaaVaihe(Pelitila t) => t.Vaihe == Vaihe.Toiminta || (t.Vaihe == Vaihe.Heitto && t.Noppa == null);

        /// <summary>Voiko vuorossa oleva siirtyä vapaasti nyt (linssi ja vaihe ennen heittoa).</summary>
        public bool VapaaSiirtyminenKaytettavissa() =>
            Matka != null && VapaaVaihe(Matka.Tila) && PelaajanLinssit(Vuorossa).Contains(Peninkulma);

        /// <summary>
        /// Vapaa siirtyminen (seitsemän peninkulman linssi): mihin tahansa laudan
        /// kaupunkiin ilman noppaa, hinta 0, vie vuoron (aika kuluu). Saapuminen
        /// kulkee samaa polkua kuin Matka.Lenna: käynnin kirjaus (Saapui: pisteet,
        /// havainto), tapahtuma ja sitten pysähdys (PysaytaSaapuessa) tai vuoron päätös.
        /// Lähtö voi olla myös reitin varrelta.
        /// </summary>
        public TekoTulos VapaaSiirtyminen(string kohde)
        {
            if (Matka == null) throw new InvalidOperationException("Linssiomistus ei ole kytketty matkaan");
            var t = Matka.Tila;
            if (!VapaaVaihe(t)) return TekoTulos.Epaonnistui("Väärä vaihe");
            var p = t.Pelaaja;
            if (!PelaajanLinssit(p).Contains(Peninkulma)) return TekoTulos.Epaonnistui("Seitsemän peninkulman linssiä ei ole tässä pelissä");
            if (kohde == null || !Matka.Verkko.Kaupungit.TryGetValue(kohde, out var k))
                return TekoTulos.Epaonnistui("Tuntematon kaupunki");
            if (p.Sijainti.Kaupungissa && p.Sijainti.Kaupunki == kohde) return TekoTulos.Epaonnistui("Olet jo täällä");
            // Esivalittu tai valittu noppatapa puretaan (web actionCancelTravel).
            t.Vaihe = Vaihe.Toiminta;
            t.AutoMatka = false;
            t.JatkaAutomaattisesti = false;
            t.Kulkutapa = null;
            t.OdottavaMaksu = 0;
            t.Noppa = null;
            t.Siirrot = null;
            t.ViimePolku = null;
            p.Sijainti = Sijainti.KaupungissaSijainti(kohde);
            Matka.KirjaaSaapuminen(p);
            Matka.Ilmoita("peninkulma", $"Seitsemän peninkulman askel kaupunkiin {k.Nimi}");
            // Matka.SaapumisenJalkeen(true) (yksityinen): pysähdys tai vuoron päätös, aika kuluu.
            if (Matka.PysaytaSaapuessa == null || !Matka.PysaytaSaapuessa(p)) Matka.PaataVuoro(true);
            return TekoTulos.Onnistui();
        }
    }
}
