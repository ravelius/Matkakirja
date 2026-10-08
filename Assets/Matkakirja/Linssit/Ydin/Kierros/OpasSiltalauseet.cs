// SILTALAUSEET (omistaja 5.10. 21.5x, Päätoimittaja; Pelikoodari generoi 94 lausetta Williamilla, juna 146): lyhyt valmis lause
// soi heti pelaajan valinnasta (siru, toive, kaupungin vaihto) tai kierroksen siirtymästä, jotta workerin vasteaika (12–17 s)
// ei ole hiljaisuutta. Ryhmä tulee workerin tunnisteesta (vaihtoehtojen_ryhmat sirujen järjestyksessä, toiveen_ryhma);
// sama lause ei toistu istunnossa. Aineisto: media.matkakirja.app/aanet/opas/siltalauseet-v1/siltalauseet.json
//   { "versio": 1, "ryhmat": { "kuittaus": [ { "id", "teksti", "kesto_s", "url" }, … ], … } }
// Moottoriton: lataus ja soitto ovat OpasSovittimessa.
using System;
using System.Collections.Generic;

namespace Matkakirja.Linssit.Kierros
{
    public sealed class Siltalause
    {
        public string Id, Ryhma, Teksti, Url;
        public double KestoS;
    }

    public sealed class OpasSiltalauseet
    {
        /// <summary>Ryhmät (Pelikoodari): kuittaus, ruoka, moderni, vihrea, vesi, vanha, lento, kierros, syventava, kaupunki, aloitus, odotus.</summary>
        public const string Kuittaus = "kuittaus", Kaupunki = "kaupunki", Kierros = "kierros", Lento = "lento", Aloitus = "aloitus", Odotus = "odotus",
            Syventava = "syventava";
        /// <summary>Kuittaukset-v1 (Pelikoodari 6.10., omistaja hyväksyi): kysymyksen kuittaus (52 neutraalia) ja odotusportaat.</summary>
        public const string KysymysRyhma = "kysymys", Odotus5 = "odotus5", Odotus12 = "odotus12", Virhe = "virhe";
        /// <summary>Sallitun 3D-alueen ulkopuolinen toive (Päätoimittaja 7.10. 01.0x: "valitse kohde listasta"; Pelikoodari generoi).</summary>
        public const string EiSallittu = "ei-sallittu";

        // TILANTEEN MUKAAN (omistaja 6.10. 14.3x "välilauseet eivät täsmää pyyntöön", Päätoimittaja hyväksyi taulukon, juna 150):
        // näennäisryhmät rajaavat aineiston ryhmiä lauseittain, eikä niillä ole vararyhmää (väärä lause on pahempi kuin hiljaisuus).
        /// <summary>Kysymys (Kysy-lista, kysyvä mikki/näppäin): vain kysymykseen sopivat syventävät lauseet; kamera ei liiku.</summary>
        public const string Kysymys = "@kysymys";
        /// <summary>Valinta listasta (täky, Liiku): kuittaus ilman vapaan toiveen lauseita.</summary>
        public const string Valinta = "@valinta";
        /// <summary>Odotus ilman lentoa: odotus ilman "perillä"-lauseita.</summary>
        public const string OdotusPaikalla = "@odotus-paikalla";
        public static readonly string[] KysymysLauseet = { "Hyvä kysymys.", "Tästä on kiinnostava tarina.", "Kerron mielelläni lisää.", "Katsotaan tarkemmin." };
        public static readonly string[] VapaanToiveenLauseet = { "Tiedän juuri oikean paikan.", "Hyvä, minulla on sinulle jotain.", "Hyvä toive, se onnistuu.", "Mainio ajatus." };
        public static readonly string[] LennonOdotukset = { "Melkein perillä.", "Kohta ollaan siellä." };
        /// <summary>Valmiin esittelyn kaupunki (omistaja TF 163: "miksi lukija sanoo pariisissa että mietin sopivan reitin? eikö se
        /// pitäisi olla jo valmiiksi mietittynä?"): lennon odotus vain "perillä"-lauseilla, paikallaan ei odotuslausetta lainkaan.</summary>
        public const string OdotusValmis = "@odotus-valmis";

        /// <summary>Ryhmä valmiin esittelyn kaupungissa: reitin miettimistä kuvaavat odotukset pois; null = ei lausetta.</summary>
        public static string ValmiillaReitilla(string ryhma) => ryhma switch
        {
            Odotus => OdotusValmis,
            OdotusPaikalla => null,
            _ => ryhma,
        };

        static bool On(string[] lista, string teksti) => teksti != null && Array.IndexOf(lista, teksti.Trim()) >= 0;

        /// <summary>Näennäisryhmä → aineiston ryhmä ja lauseehto; tavallinen ryhmä sellaisenaan (ehto null).</summary>
        public static (string ryhma, Func<Siltalause, bool> ehto) Rajaus(string ryhma) => ryhma switch
        {
            Kysymys => (Syventava, l => On(KysymysLauseet, l.Teksti)),
            Valinta => (Kuittaus, l => !On(VapaanToiveenLauseet, l.Teksti)),
            OdotusPaikalla => (Odotus, l => !On(LennonOdotukset, l.Teksti)),
            OdotusValmis => (Odotus, l => On(LennonOdotukset, l.Teksti)),
            _ => (ryhma, null),
        };

        /// <summary>Mikin tai näppäimistön teksti on kysymys (kysymysmerkki tai kysyvä alku); muuten toive tai käsky.</summary>
        public static bool OnKysymys(string teksti)
        {
            if (string.IsNullOrWhiteSpace(teksti)) return false;
            string t = teksti.Trim().ToLowerInvariant();
            if (t.EndsWith("?")) return true;
            foreach (var a in new[] { "mikä", "mitä", "mitkä", "kuka", "ketkä", "keitä", "miksi", "milloin", "missä", "mistä", "mihin", "miten",
                "kuinka", "montako", "paljonko", "onko", "oliko", "voiko", "saako", "kerro", "kertoisitko", "tiedätkö", "millainen", "minkä" })
                if (t == a || t.StartsWith(a + " ") || t.StartsWith(a + ",")) return true;
            return false;
        }

        readonly Dictionary<string, List<Siltalause>> ryhmat = new Dictionary<string, List<Siltalause>>(StringComparer.Ordinal);
        readonly HashSet<string> kaytetyt = new HashSet<string>(StringComparer.Ordinal);
        readonly Random satunnainen;

        public OpasSiltalauseet(int siemen = 0) { satunnainen = siemen == 0 ? new Random() : new Random(siemen); }

        public int Maara { get; private set; }

        /// <summary>Toisen aineiston ryhmät tähän (kuittaukset-v1 siltalauseiden rinnalle); samanniminen ryhmä korvautuu.</summary>
        public void Yhdista(OpasSiltalauseet muut)
        {
            if (muut == null) return;
            foreach (var kv in muut.ryhmat)
            {
                if (ryhmat.TryGetValue(kv.Key, out var vanha)) Maara -= vanha.Count;
                ryhmat[kv.Key] = kv.Value; Maara += kv.Value.Count;
            }
        }

        public bool OnRyhma(string ryhma) => ryhma != null && ryhmat.ContainsKey(ryhma);

        public IEnumerable<Siltalause> Kaikki()
        {
            foreach (var r in ryhmat.Values) foreach (var l in r) yield return l;
        }

        /// <summary>JSON (MiniJson-sanakirja) luetuksi; virheelliset rivit ohitetaan. null, jos ryhmiä ei ole.</summary>
        public static OpasSiltalauseet Lue(Dictionary<string, object> j, int siemen = 0)
        {
            if (j == null || !j.TryGetValue("ryhmat", out var ro) || !(ro is Dictionary<string, object> rd)) return null;
            var s = new OpasSiltalauseet(siemen);
            foreach (var kv in rd)
            {
                if (!(kv.Value is IList<object> lista)) continue;
                var r = new List<Siltalause>();
                foreach (var x in lista)
                {
                    if (!(x is Dictionary<string, object> d)) continue;
                    string S(string k) => d.TryGetValue(k, out var v) ? v as string : null;
                    string id = S("id"), url = S("url");
                    if (string.IsNullOrEmpty(id) || string.IsNullOrEmpty(url)) continue;
                    double kesto = d.TryGetValue("kesto_s", out var ko) && ko != null ? Convert.ToDouble(ko, System.Globalization.CultureInfo.InvariantCulture) : 0;
                    r.Add(new Siltalause { Id = id, Ryhma = kv.Key, Teksti = S("teksti"), Url = url, KestoS = kesto });
                }
                if (r.Count > 0) { s.ryhmat[kv.Key] = r; s.Maara += r.Count; }
            }
            return s.Maara > 0 ? s : null;
        }

        /// <summary>
        /// Käyttämätön lause ryhmästä (satunnainen, ei toistoa istunnossa); jos ryhmä puuttuu tai on käytetty loppuun, vararyhmästä
        /// (oletus kuittaus). null = ei mitään soitettavaa. saatavilla rajaa ladattuihin (esim. mp3 ladattu).
        /// </summary>
        public Siltalause Valitse(string ryhma, string vara = Kuittaus, Func<Siltalause, bool> saatavilla = null)
        {
            // Kysymykseen kuittaukset-v1:n oma ryhmä, kun se on ladattu; muuten syventävien kysymyslauseiden rajaus.
            if (ryhma == Kysymys && ryhmat.ContainsKey(KysymysRyhma)) return Ryhmasta(KysymysRyhma, saatavilla);
            var (aineisto, ehto) = Rajaus(ryhma);
            if (ehto != null)   // näennäisryhmä: ei vararyhmää
                return Ryhmasta(aineisto, l => ehto(l) && (saatavilla == null || saatavilla(l)));
            return Ryhmasta(ryhma, saatavilla) ?? (vara != null && vara != ryhma ? Ryhmasta(vara, saatavilla) : null);
        }

        Siltalause Ryhmasta(string ryhma, Func<Siltalause, bool> saatavilla)
        {
            if (ryhma == null || !ryhmat.TryGetValue(ryhma, out var r)) return null;
            var vapaat = r.FindAll(l => !kaytetyt.Contains(l.Id) && (saatavilla == null || saatavilla(l)));
            if (vapaat.Count == 0) return null;
            var valittu = vapaat[satunnainen.Next(vapaat.Count)];
            kaytetyt.Add(valittu.Id);
            return valittu;
        }

        /// <summary>
        /// Pelaajan toiveen ryhmä: siru (teksti = jokin vaihtoehdoista) → sen ryhmä workerin vaihtoehtojen_ryhmat-listasta,
        /// muuten (vapaa teksti tai ryhmä puuttuu) kuittaus.
        /// </summary>
        public static string RyhmaToiveelle(string teksti, string[] vaihtoehdot, string[] ryhmat)
        {
            if (string.IsNullOrWhiteSpace(teksti) || vaihtoehdot == null || ryhmat == null) return Kuittaus;
            string t = teksti.Trim();
            for (int i = 0; i < vaihtoehdot.Length && i < ryhmat.Length; i++)
                if (string.Equals(vaihtoehdot[i]?.Trim(), t, StringComparison.OrdinalIgnoreCase) && !string.IsNullOrEmpty(ryhmat[i])) return ryhmat[i];
            return Kuittaus;
        }
    }
}

namespace Matkakirja.Linssit.Kierros
{
    /// <summary>
    /// TÄKY (omistaja TF 144, juna 146): linssi alkaa noin 8 kiinnostavimman kohteen luettelolla (Pöllö GET /opas/kohteet, päivittäin
    /// vaihtuva, koko maailma, painotus Googlen 3D-kaupunkeihin): nimi, yksi koukkurivi, kaupunki, maa (alpha-2), sijainti, kuva.
    /// </summary>
    public sealed class OpasTaky
    {
        public string Id, Nimi, Koukku, Kaupunki, Iso2, Alarivi, KuvaUrl, KuvaTekija, KuvaLisenssi;
        public double Lat, Lon;
        /// <summary>Etäisyys katsepisteestä (GET /opas/lahella "etaisyys_m"; muuten NaN).</summary>
        public double EtaisyysM = double.NaN;

        /// <summary>{"paiva", "kohteet": [{id, nimi, koukku, kaupunki, maa, lat, lon, alarivi, kuva: {url, tekija, lisenssi} | null}]}</summary>
        public static List<OpasTaky> Lue(Dictionary<string, object> j)
        {
            var r = new List<OpasTaky>();
            if (j == null || !j.TryGetValue("kohteet", out var ko) || !(ko is IList<object> l)) return r;
            foreach (var x in l)
            {
                if (!(x is Dictionary<string, object> d)) continue;
                string S(Dictionary<string, object> dd, string k) => dd != null && dd.TryGetValue(k, out var v) ? v as string : null;
                double D(string k) => d.TryGetValue(k, out var v) && v != null ? Convert.ToDouble(v, System.Globalization.CultureInfo.InvariantCulture) : double.NaN;
                var t = new OpasTaky { Id = S(d, "id"), Nimi = S(d, "nimi"), Koukku = S(d, "koukku"), Kaupunki = S(d, "kaupunki"), Iso2 = S(d, "iso") ?? S(d, "maa"),
                    Alarivi = S(d, "alarivi"), Lat = D("lat"), Lon = D("lon"), EtaisyysM = D("etaisyys_m") };
                if (d.TryGetValue("kuva", out var ku) && ku is Dictionary<string, object> kd) { t.KuvaUrl = S(kd, "url"); t.KuvaTekija = S(kd, "tekija"); t.KuvaLisenssi = S(kd, "lisenssi"); }
                if (string.IsNullOrEmpty(t.Nimi) || double.IsNaN(t.Lat) || double.IsNaN(t.Lon) || Math.Abs(t.Lat) > 90 || Math.Abs(t.Lon) > 180) continue;
                r.Add(t);
            }
            return r;
        }

        /// <summary>Kaupunkikierroksen järjestys (Pelikoodari #4086, omistaja 6.10. 23.4x lyhin reitti): /opas/liiku "kierros": [id, …]
        /// reittijärjestyksessä. Kohteet, joiden id on kierroksessa, siinä järjestyksessä (tuntemattomat id:t ohitetaan); ilman
        /// kenttää tai yhtään osumaa koko lista sellaisenaan (tärkeysjärjestys).</summary>
        public static List<OpasTaky> Kierros(Dictionary<string, object> j, List<OpasTaky> kohteet)
        {
            if (kohteet == null) return new List<OpasTaky>();
            if (j == null || !j.TryGetValue("kierros", out var ki) || !(ki is IList<object> ids)) return new List<OpasTaky>(kohteet);
            var r = new List<OpasTaky>();
            foreach (var x in ids)
                if (x is string id && kohteet.Find(t => t.Id == id) is OpasTaky t && !r.Contains(t)) r.Add(t);
            return r.Count > 0 ? r : new List<OpasTaky>(kohteet);
        }
    }

    /// <summary>
    /// PALLOLAUSEET (Pelikoodari 8.10., omistajan pallosanasto; siltalauseet-v3b, juna 165): kierroksen siirtymän ryhmä pallossa.
    /// pallo-lahto kierroksen ensimmäiseen lähtöön, pallo-kaanto kun suunta muuttuu yli KaantoAst edellisestä osuudesta, pallo-nousu
    /// yli NousuM:n siirtymään, pallo-lasku lennon loppuun ennen kertojaa (vain jos lähdössä ei soinut pallolausetta). Enintään joka
    /// toiseen siirtymään ja kutakin ryhmää enintään RyhmaMax kertaa kierroksella; muuten tavallinen kierros-lause.
    /// HARVEMMIN (omistaja 9.10.: "kuulostaa puuduttavalta"; Päätoimittaja: noin joka 4. siirtymä, ei peräkkäin, ei toistoja):
    /// lause vain joka Vali:nteen siirtymään (muissa hiljaa, kertoja jatkaa), muulloin kuin pallon omaan tilanteeseen kierros-lause.
    /// Sama lause ei toistu kierroksella (OpasSiltalauseet.Valitse: käytetyt).
    /// </summary>
    public sealed class OpasPallolauseet
    {
        public const string Lahto = "pallo-lahto", Nousu = "pallo-nousu", Kaanto = "pallo-kaanto", Lasku = "pallo-lasku";
        public const double NousuM = 800, KaantoAst = 60;
        public const int RyhmaMax = 3, Vali = 4;
        int siirtymia, edellinen = -10; double? edSuunta;
        readonly Dictionary<string, int> kaytetty = new Dictionary<string, int>(StringComparer.Ordinal);

        public void Nollaa() { siirtymia = 0; edellinen = -10; edSuunta = null; kaytetty.Clear(); }

        /// <summary>Lähtevän siirtymän ryhmä (null = tavallinen lause); suunta = osuuden suuntima (°), matka metreinä.</summary>
        public string Lahtoon(double suunta, double matkaM, Func<string, bool> onRyhma = null)
        {
            int i = siirtymia++;
            double? muutos = null;
            if (edSuunta is double e) { double d = Math.Abs(suunta - e) % 360; muutos = d > 180 ? 360 - d : d; }
            edSuunta = suunta;
            if (i - edellinen < Vali) return null;   // enintään joka Vali:nteen siirtymään
            string r = i == 0 ? Lahto : muutos > KaantoAst ? Kaanto : matkaM > NousuM ? Nousu : null;
            return Kayta(r, i, onRyhma) ?? Kayta(OpasSiltalauseet.Kierros, i, onRyhma);
        }

        /// <summary>Lennon lopun ryhmä (null = ei lausetta): sama siirtymä kuin viimeisin Lahtoon.</summary>
        public string Laskuun(Func<string, bool> onRyhma = null)
        {
            int i = siirtymia - 1;
            return i < 0 || i - edellinen < Vali ? null : Kayta(Lasku, i, onRyhma);
        }

        string Kayta(string r, int i, Func<string, bool> onRyhma)
        {
            if (r == null || (onRyhma != null && !onRyhma(r))) return null;
            kaytetty.TryGetValue(r, out int n);
            if (n >= RyhmaMax && r != OpasSiltalauseet.Kierros) return null;
            kaytetty[r] = n + 1; edellinen = i;
            return r;
        }
    }
}
