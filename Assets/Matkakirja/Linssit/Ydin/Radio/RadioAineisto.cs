// MAAILMANRADION AINEISTO (web js/packs/radiot.js RADIOT, js/linssit/radio.js
// radionKaupungit ja naytonAsemannimi, js/packs/viritysaanet.js).
//
// Lähteet sisältöpaketissa, ensisijainen ensin:
//   kokoelmat/radiot.json          Siirtoseppä 23.9. (omistajan hybridimalli): { id, iso3, nimi, url,
//                                  tyyppi, yleisradio, lahde, sivu, luokka "sallittu" | "epaselva" |
//                                  "kielletty", jarjestys, peruste, varaAani { url, kesto, tekija, lisenssi } | null }
//                                  Skeema 1.16 (v17): useampi rivi per maa; kanava = pienin jarjestys
//                                  (rivi 1 soi aina), muut rivit Vaihtoehdot-listaan (esim. kielletty
//                                  yleisradio "<ISO3>:yleisradio", jarjestys 2 → linkki UI:lle).
//   moduulit/js/packs/radiot.json  RADIOT { ISO3: { url, asema, virallinen } } (varareitti ilman
//                                  lisenssitietoa: luokka null → ei soittoa, ei edes kehittäjätilassa)
//   kokoelmat/kaupungit.json       kaupungit laudan järjestyksessä (maa, aloitus, lentokentta)
//   moduulit/js/packs/viritysaanet.json  VIRITYSAANET [{ tiedosto, kesto }]
//
// Kanava on MAALLA eikä kaupungilla: radiotilassa kartalla näkyy yksi kaupunki per maa
// (web "YKSI KAUPUNKI PER MAA", omistaja 4.8.2026).
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using Matkakirja.Peli;

namespace Matkakirja.Linssit.Radio
{
    public sealed class Asema
    {
        public string Id, Iso3, Nimi, Url, Tyyppi;
        public bool Yleisradio;
        /// <summary>Maan rivien järjestys (skeema 1.16); puuttuva = 1.</summary>
        public int Jarjestys = 1;
        /// <summary>
        /// Omistajan luokkasääntö (23.9.2026 klo 21.1x): "sallittu" ja "epaselva" soivat, "kielletty"
        /// (ja v16:n vanha "linkki") avaa aseman sivun. null = tuntematon (varareitin moduuli): ei soittoa.
        /// </summary>
        public string Luokka;
        /// <summary>Aseman oma sivu (luokka kielletty → linkki).</summary>
        public string Sivu;
        /// <summary>Vanha äänite (kielletty tai lähetyksen varareitti), null jos ei ole.</summary>
        public string VaraUrl;
    }

    public sealed class RadioKaupunki
    {
        public string Id, Nimi, Iso3;
        public double Lat, Lon;
        public bool Aloitus, Lentokentta;
    }

    public sealed class RadioAineisto
    {
        /// <summary>Viritysäänten osoitteen juuri (media-ämpärin audio/-kansio).</summary>
        public const string ViritysJuuri = "https://media.matkakirja.app/audio/";

        /// <summary>
        /// Pistenäytön 5 × 7 -fontin merkit (web js/linssit/pistenaytto.js FONTTI, 92 merkkiä).
        /// Natiivi-UI:n pistenäyttö ja näytön nimen sääntö käyttävät samaa listaa.
        /// </summary>
        public const string PistefontinMerkit = "0123456789 ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ.,-:'()?!/|+·БГДЁЖЗИЙЛПУФЦЧШЩЪЫЬЭЮЯЄЇҐАВЕКМНОРСТХІЅЈ";
        public static readonly ISet<char> Pistefontti = new HashSet<char>(PistefontinMerkit);

        public readonly Dictionary<string, Asema> Asemat = new Dictionary<string, Asema>(StringComparer.Ordinal);
        /// <summary>Maan muut rivit järjestyksessä (skeema 1.16), esim. kielletty yleisradio linkkinä.</summary>
        public readonly Dictionary<string, List<Asema>> Vaihtoehdot = new Dictionary<string, List<Asema>>(StringComparer.Ordinal);
        public readonly List<RadioKaupunki> Kaupungit = new List<RadioKaupunki>();
        public readonly Dictionary<string, string> Maat = new Dictionary<string, string>(StringComparer.Ordinal);
        public readonly List<string> Viritysaanet = new List<string>();
        public LinssiTiedot Tiedot;

        public Asema MaanAsema(string iso3) => iso3 != null && Asemat.TryGetValue(iso3, out var a) ? a : null;
        public RadioKaupunki Kaupunki(string id) => Kaupungit.FirstOrDefault(k => k.Id == id);

        static Dictionary<string, object> Ob(object x) => x as Dictionary<string, object>;
        static List<object> Lista(object x) => x as List<object>;
        static void Lisaa(Dictionary<string, List<Asema>> d, string iso, Asema a)
        {
            if (!d.TryGetValue(iso, out var l)) d[iso] = l = new List<Asema>();
            l.Add(a);
        }
        static Dictionary<string, object> Vienti(object moduuli, string nimi)
        {
            var o = Ob(MiniJson.Kentta(Ob(MiniJson.Kentta(Ob(moduuli), "exportit")), nimi));
            return Ob(MiniJson.Kentta(o, "arvo")) ?? o;
        }

        /// <param name="radiot">kokoelmat/radiot.json tai null</param>
        /// <param name="radiotModuuli">moduulit/js/packs/radiot.json (käytetään, jos kokoelmaa ei ole)</param>
        /// <param name="kaupungit">kokoelmat/kaupungit.json</param>
        /// <param name="maat">kokoelmat/maat.json (maiden nimet näytölle) tai null</param>
        /// <param name="viritysaanet">moduulit/js/packs/viritysaanet.json tai null</param>
        /// <param name="linssi">moduulit/js/linssit/radio.json (LINSSI) tai null</param>
        public static RadioAineisto Lue(object radiot, object radiotModuuli, object kaupungit,
            object maat = null, object viritysaanet = null, object linssi = null)
        {
            var a = new RadioAineisto();
            var alkiot = Lista(MiniJson.Kentta(Ob(radiot), "alkiot"));
            if (alkiot != null)
            {
                foreach (var r in alkiot.Select(Ob).Where(r => r != null))
                {
                    var iso = MiniJson.Teksti(r, "iso3") ?? MiniJson.Teksti(r, "id");
                    var url = MiniJson.Teksti(r, "url");
                    var luokka = MiniJson.Teksti(r, "luokka")
                        ?? MiniJson.Teksti(Ob(MiniJson.Kentta(r, "lisenssi")), "luokka");
                    if (iso == null) continue;
                    var asema = new Asema
                    {
                        Id = MiniJson.Teksti(r, "id") ?? iso,
                        Iso3 = iso, Nimi = MiniJson.Teksti(r, "nimi"), Url = url, Tyyppi = MiniJson.Teksti(r, "tyyppi"),
                        Yleisradio = MiniJson.Totuus(r, "yleisradio"), Luokka = luokka,
                        Jarjestys = (int)(MiniJson.Luku(r, "jarjestys") ?? 1),
                        Sivu = MiniJson.Teksti(r, "sivu"),
                        VaraUrl = MiniJson.Teksti(Ob(MiniJson.Kentta(r, "varaAani")), "url"),
                    };
                    // Kanava = pienin järjestys (tasapelissä ensimmäinen); muut rivit vaihtoehdoiksi.
                    if (a.Asemat.TryGetValue(iso, out var ed) && ed.Jarjestys <= asema.Jarjestys) Lisaa(a.Vaihtoehdot, iso, asema);
                    else { if (ed != null) Lisaa(a.Vaihtoehdot, iso, ed); a.Asemat[iso] = asema; }
                }
                foreach (var v in a.Vaihtoehdot.Values) v.Sort((x, y) => x.Jarjestys.CompareTo(y.Jarjestys));
            }
            else if (Vienti(radiotModuuli, "RADIOT") is Dictionary<string, object> taulu)
            {
                foreach (var (iso, arvo) in taulu)
                {
                    var r = Ob(arvo);
                    var url = MiniJson.Teksti(r, "url");
                    if (string.IsNullOrEmpty(url)) continue;
                    a.Asemat[iso] = new Asema
                    {
                        Iso3 = iso, Nimi = MiniJson.Teksti(r, "asema"), Url = url,
                        Tyyppi = TyyppiOsoitteesta(url), Yleisradio = MiniJson.Totuus(r, "virallinen"),
                    };
                }
            }

            foreach (var k in (Lista(MiniJson.Kentta(Ob(kaupungit), "alkiot")) ?? new List<object>()).Select(Ob).Where(k => k != null))
                a.Kaupungit.Add(new RadioKaupunki
                {
                    Id = MiniJson.Teksti(k, "id"), Nimi = MiniJson.Teksti(k, "nimi"), Iso3 = MiniJson.Teksti(k, "maa"),
                    Lat = MiniJson.Luku(k, "lat") ?? double.NaN, Lon = MiniJson.Luku(k, "lon") ?? double.NaN,
                    Aloitus = MiniJson.Totuus(k, "aloitus"), Lentokentta = MiniJson.Totuus(k, "lentokentta"),
                });

            foreach (var m in (Lista(MiniJson.Kentta(Ob(maat), "alkiot")) ?? new List<object>()).Select(Ob).Where(m => m != null))
                if (MiniJson.Teksti(m, "id") is string id) a.Maat[id] = MiniJson.Teksti(m, "nimi");

            var vienti = MiniJson.Kentta(Ob(MiniJson.Kentta(Ob(viritysaanet), "exportit")), "VIRITYSAANET");
            var aanet = Lista(vienti) ?? Lista(MiniJson.Kentta(Ob(vienti), "arvo")) ?? new List<object>();
            foreach (var v in aanet.Select(Ob))
                if (MiniJson.Teksti(v, "tiedosto") is string t) a.Viritysaanet.Add(ViritysJuuri + t);

            var l = linssi == null ? null : Vienti(linssi, "LINSSI");
            a.Tiedot = new LinssiTiedot
            {
                Id = MiniJson.Teksti(l, "tunnus") ?? "radio",
                Nimi = MiniJson.Teksti(l, "nimi") ?? "Maailmanradio",
                Lyhyt = MiniJson.Teksti(l, "lyhyt"),
                Jarjestys = (int)(MiniJson.Luku(l, "jarjestys") ?? 60),
                Ikoni = MiniJson.Teksti(l, "ikoni"),
                Valokuva = MiniJson.Totuus(l, "valokuva"),
            };
            return a;
        }

        static string TyyppiOsoitteesta(string url)
        {
            var u = url.ToLowerInvariant();
            if (u.Contains(".m3u8") || u.Contains("hls")) return "hls";
            if (u.Contains(".aac") || u.Contains("aac")) return "aac";
            return "mp3";
        }

        // ── Yksi kaupunki per maa (web radionKaupungit, maanKaupunki) ─────────

        /// <summary>
        /// Radiotilassa näkyvät kaupungit: jokaisesta maasta yksi, maattomat itse. Säännöt
        /// järjestyksessä: pelaajan oma sijainti, aseman nimessä mainittu kaupunki (omana
        /// sananaan, ≥ 3 merkkiä, tarkkeet pois), laudan arvo (aloitus 2 + lentokenttä 1),
        /// tasapelissä laudan järjestys.
        /// </summary>
        public HashSet<string> RadionKaupungit(string sijainti = null)
        {
            var nakyvat = new HashSet<string>(StringComparer.Ordinal);
            var maittain = new Dictionary<string, List<RadioKaupunki>>(StringComparer.Ordinal);
            var jarjestys = new List<string>();
            foreach (var k in Kaupungit)
            {
                if (k.Id == null) continue;
                if (string.IsNullOrEmpty(k.Iso3)) { nakyvat.Add(k.Id); continue; }
                if (!maittain.TryGetValue(k.Iso3, out var l)) { maittain[k.Iso3] = l = new List<RadioKaupunki>(); jarjestys.Add(k.Iso3); }
                l.Add(k);
            }
            foreach (var iso in jarjestys) nakyvat.Add(MaanKaupunki(iso, maittain[iso], sijainti));
            return nakyvat;
        }

        string MaanKaupunki(string iso, List<RadioKaupunki> lista, string sijainti)
        {
            if (lista.Count == 1) return lista[0].Id;
            var oma = sijainti == null ? null : lista.FirstOrDefault(k => k.Id == sijainti);
            if (oma != null) return oma.Id;
            var asema = MaanAsema(iso)?.Nimi ?? "";
            if (asema.Length > 0)
            {
                var mainittu = lista.FirstOrDefault(k => NimiEsiintyy(asema, k.Nimi));
                if (mainittu != null) return mainittu.Id;
            }
            var paras = lista[0];
            foreach (var k in lista) if (Arvo(k) > Arvo(paras)) paras = k;
            return paras.Id;
        }

        static int Arvo(RadioKaupunki k) => (k.Aloitus ? 2 : 0) + (k.Lentokentta ? 1 : 0);

        /// <summary>Tarkkeet ja kirjainkoko pois (web riisuNimi: NFD, \p{M} pois, pienaakkoset).</summary>
        public static string RiisuNimi(string s)
        {
            var sb = new StringBuilder();
            foreach (var c in (s ?? "").Normalize(NormalizationForm.FormD))
                if (CharUnicodeInfo.GetUnicodeCategory(c) is var kat
                    && kat != UnicodeCategory.NonSpacingMark && kat != UnicodeCategory.SpacingCombiningMark && kat != UnicodeCategory.EnclosingMark)
                    sb.Append(c);
            return sb.ToString().ToLowerInvariant();
        }

        /// <summary>Esiintyykö nimi tekstissä omana sananaan (web nimiEsiintyy).</summary>
        public static bool NimiEsiintyy(string teksti, string nimi)
        {
            var pitka = RiisuNimi(teksti);
            var lyhyt = RiisuNimi(nimi);
            if (lyhyt.Length < 3 || pitka.Length == 0) return false;
            for (int i = pitka.IndexOf(lyhyt, StringComparison.Ordinal); i != -1; i = pitka.IndexOf(lyhyt, i + 1, StringComparison.Ordinal))
            {
                bool ennen = i > 0 && char.IsLetterOrDigit(pitka[i - 1]);
                int j = i + lyhyt.Length;
                bool jalkeen = j < pitka.Length && char.IsLetterOrDigit(pitka[j]);
                if (!ennen && !jalkeen) return true;
            }
            return false;
        }

        // ── Näytön nimi (web naytonAsemannimi) ───────────────────────────

        /// <summary>
        /// Pistenäytön nimi: osa ennen ensimmäistä sulkua, pilkkua, kauttaviivaa tai pystyviivaa;
        /// jos siinä on merkkejä, joita 5 × 7 -pistefontti ei osaa, maan nimi, lopuksi ISO-koodi.
        /// </summary>
        public static string NaytonNimi(string asema, string maa, string iso, ISet<char> fontti)
        {
            var lyhyt = (asema ?? "").Split('(', ',', '/', '|')[0].Trim();
            if (Piirtyy(lyhyt, fontti)) return lyhyt;
            if (Piirtyy(maa, fontti)) return maa;
            return iso ?? "";
        }

        static bool Piirtyy(string teksti, ISet<char> fontti)
        {
            if (string.IsNullOrWhiteSpace(teksti)) return false;
            return teksti.All(c => c == ' ' || Merkki(c, fontti));
        }

        /// <summary>
        /// Osaako fontti merkin (web merkinRivit): iso kirjain, sitten tarkkeeton perusmuoto
        /// (É → E; Ä, Ö ja Å ovat fontissa omina kirjaiminaan). Webin kankaalta näytteistetyt
        /// merkit eivät ole natiivissa, joten ne lasketaan puuttuviksi.
        /// </summary>
        public static bool Merkki(char c, ISet<char> fontti)
        {
            var iso = char.ToUpperInvariant(c).ToString();
            if (iso.Length == 1 && fontti.Contains(iso[0])) return true;
            var riisuttu = new string(iso.Normalize(NormalizationForm.FormD)
                .Where(x => x < '\u0300' || x > '\u036f').ToArray());
            return riisuttu.Length == 1 && fontti.Contains(riisuttu[0]);
        }
    }
}
