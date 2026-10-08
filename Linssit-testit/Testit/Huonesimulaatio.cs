// HUONESIMULAATIO (Linssiseppä 2, 8.10.2026; pelattavuusmalli-olavinlinna.md kohta 11): Olavinlinnan ensimmäinen pala (huoneet 1–5,
// reitti:pelaaja-1…20) ilman Unityä. Ydin-luokat (Vartija, Askelaani) v44w-datalla (kultaiset/olavinlinna-v44w-*.json) ja
// SeikkailuVartijat-sovittimen säännöt (7aab3f25): partioreitit merkeistä (odotus 2 s, jos odota_s/odotus_s puuttuu), valoisuus = tilojen
// liekit (DioraamaLiekit: perus 0,25, 1 − d / 5 m, piste 1 m jalkojen yllä; kultaiset/olavinlinna-v44w-liekit.json) + valo:-merkit (sade,
// voima) + lyhdyn (4 m) tai soihdun (6 m) kantaja + palava kynttilä ≥ 0,9 (kyyryssä 0,45), piilo 0,7 m (kyykky vain hiipien; nähty
// piiloon meno ei suojaa), askeleet pinnan mukaan seinäsäännöllä (tarjotin kädessä vain juoksu kuuluu), huuto kutsuu 2 lähintä 20 m:stä,
// riita 40 s:n välein (pelaaja vesiportilla tai ulkona), torkkuja ottaa tarjottimen myös heränneenä (ei hälytyksessä) ja istuu syömään,
// M-osa (historia-m): istuvat ja seisovat hahmot (profiilitta linnaväki; linnaväki ja noppa syövät katsejaksoin, vouti valveilla),
// rannan vartijat odottavat (Aktivoi/Odottamaan), naamio naulakosta (kulkulupa; pukeutuminen 2 s; ei kelpaa hahmoille, joiden merkki on
// osassa muurikaytava: SeikkailuVartijat.NaamioEiKelpaaOsa, PT 8.10.), harjan hahmot uppoutuneina (ei selkäaistia) ja talonpoika
// kääntyy kerran (kaantyy_s) 5 s pelaajan tultua 8 m:iin, kuulo: yli 2,5 m:n korkeusero puolittaa (Aanilahde.Y),
// kiinni → tarkistuspiste (portaalin ylitys ilman vaaraa), armo 4 s, kaikki valppaiksi.
// Yksinkertaistukset: hahmot ja pelaaja kulkevat suoraan (ei NavMeshiä); näkölinja vapaa samassa osassa ja naapuriosaan vain
// portaalin (ovi:-merkki) kautta, kerrosero ≤ 2 m; mukana vain hahmot, joiden reitti on alle 25 m:n päässä pelaajan reitistä.
// Kopioi() kloonaa koko tilan (myös Vartijan yksityiset kentät), jotta testiajuri voi kokeilla ajoituksia etukäteen.
using System;
using System.Collections.Generic;
using System.IO;
using System.Reflection;
using Matkakirja.Linssit.Seikkailu;
using Matkakirja.Peli;

namespace Matkakirja.Linssit.Testit
{
    public sealed class Huonesimulaatio
    {
        public const double Dt = 1 / 30.0, KaukoM = 20, PiiloM = 0.7, LyhtyM = 4, SoihtuM = 6, ArmoS = 4, RiitaValiS = 40, HuutoM = 20, HeittoAaniM = 12, PoimintaM = 1.2, AnnaM = 1.6;

        public sealed class Hahmo
        {
            public string Nimi; public Vartija Aivot; public double X, Y, Z, ValoM; public bool NakiViimeksi;
            public string Osa; public double OsaX, OsaY, OsaZ;   // osan välimuisti (Askelaani.Osa vain liikkuessa)
            /// <summary>Piilossa odottava hahmo (SeikkailuVartijat.Odottavat: rannan vartijat) ei päivity eikä valaise.</summary>
            public bool Aktiivinen = true; public double AlkuX, AlkuY, AlkuZ;
            /// <summary>Ensimmäisen merkin osa (sovittimen V.Osa): naamio ei kelpaa osassa NaamioEiKelpaaOsa.</summary>
            public string MerkkiOsa;
            /// <summary>Huone 8: kertakääntö (kaantyy_s) käytävää kohti; 0 ei, 1 odottaa, 2 kääntynyt, 3 tehty (SeikkailuVartijat.Kaantyy).</summary>
            public double KaantyyS, AlkuYaw, KaantyyAika; public int KaantyyVaihe;
            public List<(double X, double Y, double Z)> Pisteet = new List<(double, double, double)>();
        }

        static KavelyData data;
        static List<(double X, double Y, double Z, double Sade, double Voima)> valot;
        static List<(double X, double Y, double Z)> reitti;
        static (double X, double Z) vene;
        public static KavelyData Data { get { Lataa(); return data; } }
        /// <summary>reitti:pelaaja-N järjestyksessä (huoneet 1–5).</summary>
        public static List<(double X, double Y, double Z)> Reitti { get { Lataa(); return reitti; } }

        static string Lue(string n) => File.ReadAllText(Path.Combine(AppContext.BaseDirectory, "..", "kultaiset", n));
        static void Lataa()
        {
            if (data != null) return;
            data = KavelyData.Lue(Lue("olavinlinna-v44w-osat.json"), Lue("olavinlinna-v44w-merkit.json"));
            valot = new List<(double, double, double, double, double)>();
            foreach (var l in MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(MiniJson.ObjektiTaiNull(MiniJson.Jasenna(Lue("olavinlinna-v44w-liekit.json"))), "liekit")))
            {
                var o = MiniJson.ObjektiTaiNull(l); var p = MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(o, "paikka"));
                valot.Add(((double)p[0], (double)p[1], (double)p[2], Math.Clamp(2.5 + 2.5 * (MiniJson.Luku(o, "koko") ?? 1), 2.5, 6), 1));
            }
            // valo:-merkit, joilla on säde (hiilipannu, takka, raot); KavelyMerkki ei pidä kenttiä sade/voima, joten luetaan raakana.
            foreach (var m in MiniJson.TaulukkoTaiTyhja(MiniJson.Jasenna(Lue("olavinlinna-v44w-merkit.json"))))
            {
                var o = MiniJson.ObjektiTaiNull(m); string nimi = MiniJson.Teksti(o, "nimi") ?? "";
                if (!nimi.StartsWith("valo:", StringComparison.Ordinal) || !(MiniJson.Luku(o, "sade") is double sade) || MiniJson.Kentta(o, "liikkuu") is bool lb && lb) continue;
                var p = MiniJson.TaulukkoTaiTyhja(MiniJson.Kentta(o, "paikka"));
                valot.Add(((double)p[0], (double)p[1], (double)p[2], sade, MiniJson.Luku(o, "voima") ?? 1));
            }
            var r = new SortedDictionary<int, (double, double, double)>();
            foreach (var m in data.Lajia("reitti")) if (m.Tunnus.StartsWith("pelaaja-", StringComparison.Ordinal) && int.TryParse(m.Tunnus.Substring(8), out int n)) r[n] = (m.X, m.Y, m.Z);
            reitti = new List<(double, double, double)>(r.Values);
            foreach (var m in data.Merkit) if (m.Nimi == "vene:laituri") vene = (m.X, m.Z);
        }

        public List<Hahmo> Hahmot = new List<Hahmo>();
        public double PX, PY, PZ, T, ArmoAsti = -1, EnsiHavainto = -1;
        public bool Tarjotin, Annettu, Kynttila, Hiipii, Naamio;
        /// <summary>SeikkailuVartijat.Odottavat: rannan soihtuvartijat vasta pakon kellon jälkeen.</summary>
        public static readonly string[] Odottavat = { "ranta", "seisoo-ranta-vartija" };
        public const string NaamioEiKelpaaOsa = "muurikaytava";
        public int Kiinni, Seuraava = 1, TarkistusSeuraava = 1;
        public bool VaroitusRikki;
        public (double X, double Y, double Z) Tarkistus;
        public HashSet<string> Kaytetyt = new HashSet<string>();
        public List<Aanilahde> Jono = new List<Aanilahde>();
        bool oliPiilossa, paljastui, riitaKaynnissa; double riitaAsti = 20, riitaAlkaa = -1; string pelaajanOsa;

        public static Huonesimulaatio Uusi()
        {
            var d = Data; var s = new Huonesimulaatio();
            (s.PX, s.PY, s.PZ) = Reitti[0]; s.Tarkistus = Reitti[0]; s.pelaajanOsa = Askelaani.Osa(d, s.PX, s.PY, s.PZ);
            var reitit = new SortedDictionary<string, List<KavelyMerkki>>(StringComparer.Ordinal);
            foreach (var m in d.Lajia("istuu")) if (m.Profiili != null || m.Tunnus == "vouti") reitit["istuu-" + m.Tunnus] = new List<KavelyMerkki> { m };
            foreach (var m in d.Lajia("seisoo")) if (m.Henkilo != null) reitit["seisoo-" + m.Tunnus] = new List<KavelyMerkki> { m };
            foreach (var m in d.Lajia("partio"))
            {
                int vi = m.Tunnus.LastIndexOf('-');
                string nimi = vi > 0 && int.TryParse(m.Tunnus.Substring(vi + 1), out _) ? m.Tunnus.Substring(0, vi) : m.Tunnus;
                if (!reitit.TryGetValue(nimi, out var l)) reitit[nimi] = l = new List<KavelyMerkki>();
                l.Add(m);
            }
            foreach (var kv in reitit)
            {
                kv.Value.Sort((a, b) => Numero(a.Tunnus).CompareTo(Numero(b.Tunnus)));
                bool lahella = false;
                foreach (var m in kv.Value) foreach (var q in Reitti) if (Etaisyys3(m.X, m.Y, m.Z, q.X, q.Y, q.Z) < 25) lahella = true;
                if (!lahella) continue;
                var eka = kv.Value.Find(x => x.Profiili != null || x.Henkilo != null) ?? kv.Value[0];
                bool istuu = eka.Laji == "istuu", seisoo = eka.Laji == "seisoo";
                var p = new List<(double, double, double)>();
                foreach (var m in kv.Value) p.Add((m.X, m.Z, istuu || seisoo ? 1e9 : m.OdotaS > 0 ? m.OdotaS : 2.0));
                // Alkusuunta glTF-kehyksessä: kierto_y (rad) = katse (sin, cos) x/z-tasossa (portinvartija laiturille, torkkuja kammioon).
                var h = new Hahmo { Nimi = kv.Key, X = kv.Value[0].X, Y = kv.Value[0].Y, Z = kv.Value[0].Z, Aktiivinen = Array.IndexOf(Odottavat, kv.Key) < 0,
                    Aivot = new Vartija(p, eka.KiertoY is double k ? k * 180 / Math.PI : 0)
                    {
                        Profiili = (istuu || seisoo) && eka.Profiili == null ? VartijaProfiili.Linnavaki : VartijaProfiili.Hae(eka.Profiili),
                        Torkkuu = istuu && eka.Profiili != null, Syo = istuu && (eka.Tunnus.StartsWith("linnavaki", StringComparison.Ordinal) || eka.Tunnus.StartsWith("noppa", StringComparison.Ordinal)),
                        Uppoutunut = seisoo && eka.Tunnus.StartsWith("harja", StringComparison.Ordinal),
                    } };
                h.KaantyyS = eka.KaantyyS; h.AlkuYaw = h.Aivot.Yaw;
                (h.AlkuX, h.AlkuY, h.AlkuZ) = (h.X, h.Y, h.Z); h.MerkkiOsa = eka.Osa ?? kv.Key;
                foreach (var m in kv.Value) h.Pisteet.Add((m.X, m.Y, m.Z));
                var kantaja = kv.Value.Find(x => x.Lyhty || x.Soihtu);
                if (kantaja != null) h.ValoM = kantaja.Soihtu ? SoihtuM : LyhtyM;
                foreach (var pm in d.Lajia("piilo")) h.Aivot.Piilot.Add((pm.X, pm.Z));
                s.Hahmot.Add(h);
            }
            return s;
        }

        static int Numero(string t) { int vi = t.LastIndexOf('-'); return vi > 0 && int.TryParse(t.Substring(vi + 1), out int n) ? n : 0; }
        public static double Etaisyys3(double ax, double ay, double az, double bx, double by, double bz) { double dx = ax - bx, dy = ay - by, dz = az - bz; return Math.Sqrt(dx * dx + dy * dy + dz * dz); }
        public static double Etaisyys2(double ax, double az, double bx, double bz) { double dx = ax - bx, dz = az - bz; return Math.Sqrt(dx * dx + dz * dz); }
        public Hahmo Hae(string nimi) => Hahmot.Find(h => h.Nimi == nimi);

        /// <summary>SeikkailuVartijat.Aktivoi / Odottamaan: piilossa odottava hahmo esiin, tai takaisin alkuun, rauhaan ja piiloon.</summary>
        public void Aktivoi(string nimi) { var h = Hae(nimi); if (h != null) h.Aktiivinen = true; }
        public void Odottamaan(string nimi) { var h = Hae(nimi); if (h == null) return; (h.X, h.Y, h.Z) = (h.AlkuX, h.AlkuY, h.AlkuZ); h.Aivot.Nollaa(h.X, h.Z); h.Aktiivinen = false; }

        /// <summary>M-osan alku (huone 6, reitti:pelaaja-21 kaari-ovella): tarjotin annettu, kynttilä puhallettu, torkkuja syö.</summary>
        public static Huonesimulaatio UusiM()
        {
            var s = Uusi();
            (s.PX, s.PY, s.PZ) = Reitti[20]; s.Tarkistus = Reitti[20]; s.Seuraava = s.TarkistusSeuraava = 21; s.pelaajanOsa = Askelaani.Osa(Data, s.PX, s.PY, s.PZ);
            s.Annettu = true; s.Kynttila = false;
            foreach (var h in s.Hahmot) if (h.Aivot.Profiili == VartijaProfiili.Torkku && h.Nimi == "istuu-torkkuva-vartija") { h.Aivot.Torkkuu = true; h.Aivot.Syo = true; }
            return s;
        }

        static readonly MethodInfo Klooni = typeof(object).GetMethod("MemberwiseClone", BindingFlags.Instance | BindingFlags.NonPublic);
        static readonly Dictionary<Type, List<FieldInfo>> listakentat = new Dictionary<Type, List<FieldInfo>>();
        static T Syva<T>(T o) where T : class
        {
            var k = (T)Klooni.Invoke(o, null);
            if (!listakentat.TryGetValue(typeof(T), out var kentat))
            {
                listakentat[typeof(T)] = kentat = new List<FieldInfo>();
                for (var t = typeof(T); t != null; t = t.BaseType)
                    foreach (var f in t.GetFields(BindingFlags.Instance | BindingFlags.Public | BindingFlags.NonPublic | BindingFlags.DeclaredOnly))
                        if (f.FieldType.IsGenericType && f.FieldType.GetGenericTypeDefinition() == typeof(List<>)) kentat.Add(f);
            }
            foreach (var f in kentat) if (f.GetValue(o) is object l) f.SetValue(k, Activator.CreateInstance(f.FieldType, l));
            return k;
        }

        public Huonesimulaatio Kopioi()
        {
            var k = Syva(this);
            k.Hahmot = new List<Hahmo>();
            foreach (var h in Hahmot) { var u = Syva(h); u.Aivot = Syva(h.Aivot); k.Hahmot.Add(u); }
            k.Kaytetyt = new HashSet<string>(Kaytetyt);
            return k;
        }

        /// <summary>Pelaajan valoisuus (SeikkailuVartijat.PelaajanValoisuus): liekit 1 m jalkojen yllä, valo:-merkit, kynttilä, kannetut valot.</summary>
        public double Valoisuus()
        {
            double v = 0.25;
            foreach (var l in valot) { double d = Etaisyys3(l.X, l.Y, l.Z, PX, PY + 1, PZ); if (d < l.Sade) v = Math.Max(v, l.Voima * (1 - d / l.Sade)); }
            if (Kynttila) v = Math.Max(v, Hiipii ? 0.45 : 0.9);
            foreach (var h in Hahmot) if (h.ValoM > 0 && h.Aktiivinen) v = Math.Max(v, 1 - Etaisyys3(h.X, h.Y, h.Z, PX, PY, PZ) / h.ValoM);
            return Math.Min(1, v);
        }

        /// <summary>Näkölinja: sama osa, tai naapuriosa portaalin aukon kautta; kerrosero ≤ 2 m.</summary>
        public bool Nakolinja(Hahmo h) => Nakolinja(h, Askelaani.Osa(Data, h.X, h.Y, h.Z), Askelaani.Osa(Data, PX, PY, PZ));
        bool Nakolinja(Hahmo h, string a, string b)
        {
            if (Math.Abs(h.Y - PY) > 2) return false;
            var d = Data;
            if (a == b) return true;
            if (a == null || b == null || Askelaani.Kuuluvuus(d, 1, a, b) <= 0) return false;
            foreach (var osa in new[] { a, b })
                foreach (var p in d.Osat[osa].Portaalit)
                {
                    if (p.Y < Math.Min(h.Y, PY) - 1 || p.Y > Math.Max(h.Y, PY) + 1) continue;
                    double ux = PX - h.X, uz = PZ - h.Z, uu = ux * ux + uz * uz;
                    double t = uu < 1e-9 ? 0 : Math.Clamp(((p.X - h.X) * ux + (p.Z - h.Z) * uz) / uu, 0, 1);
                    if (Etaisyys2(h.X + ux * t, h.Z + uz * t, p.X, p.Z) <= p.Leveys / 2 + 0.2) return true;
                }
            return false;
        }

        public bool Piilossa()
        {
            foreach (var m in Data.Lajia("piilo"))
                if (Etaisyys2(PX, PZ, m.X, m.Z) <= PiiloM && Math.Abs(PY - m.Y) <= 1.2 && (m.Tyyppi == "seisova" || Hiipii)) return true;
            return false;
        }

        /// <summary>Pelaaja liikkuu kohti pistettä (hiipien 0,9 m/s, muuten 1,4 m/s) yhden kehyksen ja maailma päivittyy; palauttaa, onko perillä.</summary>
        public bool Askel((double X, double Y, double Z) q, bool hiipii)
        {
            Hiipii = hiipii;
            double dx = q.X - PX, dz = q.Z - PZ, dd = Math.Sqrt(dx * dx + dz * dz), nopeus = hiipii ? Kavely.HiipiminenMs : Kavely.KavelyMs, a = Math.Min(dd, nopeus * Dt);
            if (dd > 1e-6) { PX += dx / dd * a; PZ += dz / dd * a; PY += (q.Y - PY) * a / dd; }
            else PY = q.Y;
            Paivita(dd > 1e-6 ? nopeus : 0);
            return dd - a < 0.05;
        }

        public void Odota(bool hiipii) { Hiipii = hiipii; Paivita(0); }

        /// <summary>Toiminto pelaajan kohdalla: tarjotin pöydältä, eväät torkkuvalle (kynttilä jää käteen), naamio naulakosta.</summary>
        public void Toiminnot()
        {
            if (!Naamio) foreach (var m in Data.Lajia("naulakko")) if (Etaisyys2(PX, PZ, m.X, m.Z) <= PoimintaM && Math.Abs(PY - m.Y) < 2) Naamio = true;
            if (!Tarjotin && !Annettu)
                foreach (var m in Data.Lajia("esine")) if (m.Kannettava && m.Tunnus == "tarjotin" && Etaisyys2(PX, PZ, m.X, m.Z) <= PoimintaM && Math.Abs(PY - m.Y) < 1.5) Tarjotin = true;
            if (Tarjotin)
                foreach (var h in Hahmot)
                    if (h.Aivot.Profiili == VartijaProfiili.Torkku && !h.Aivot.Syo && h.Aivot.Tila != VartijanTila.Halytys && h.Aivot.Tila != VartijanTila.Kiinni
                        && Etaisyys3(h.X, h.Y, h.Z, PX, PY, PZ) < AnnaM) { h.Aivot.Torkkuu = true; h.Aivot.Syo = true; Tarjotin = false; Annettu = true; Kynttila = true; }
        }

        /// <summary>Heitettävät ja kaadettavat pelaajan ulottuvilla (≤ 1,2 m), joita ei ole käytetty.</summary>
        public List<KavelyMerkki> Ulottuvilla()
        {
            var l = new List<KavelyMerkki>();
            foreach (var m in Data.Lajia("esine")) if ((m.Heitettava || m.Kaadettava) && !Kaytetyt.Contains(m.Nimi) && Etaisyys2(PX, PZ, m.X, m.Z) <= PoimintaM && Math.Abs(PY - m.Y) < 1.5) l.Add(m);
            return l;
        }

        /// <summary>Heitto (kolahdus 12 m kohteessa) tai kaato (aani_m esineen kohdalla).</summary>
        public void Kayta(KavelyMerkki e, (double X, double Y, double Z) kohde)
        {
            Kaytetyt.Add(e.Nimi);
            if (e.Kaadettava) Jono.Add(new Aanilahde(e.X, e.Z, e.AaniM > 0 ? e.AaniM : HeittoAaniM, Askelaani.Osa(Data, e.X, e.Y, e.Z), e.Y));
            else Jono.Add(new Aanilahde(kohde.X, kohde.Z, HeittoAaniM, Askelaani.Osa(Data, kohde.X, kohde.Y, kohde.Z), kohde.Y));
        }

        bool Vaara() { foreach (var h in Hahmot) if (h.Aktiivinen && h.Aivot.Tila != VartijanTila.Partio && h.Aivot.Tila != VartijanTila.Paluu) return true; return false; }

        void Paivita(double vauhti)
        {
            var d = Data; T += Dt;
            var pv = Hahmot.Find(h => h.Aivot.Profiili == VartijaProfiili.Portinvartija);
            string osa = Askelaani.Osa(d, PX, PY, PZ);
            // Riita (SeikkailuVartijat.Riita): 40 s:n välein, jos pelaaja vesiportilla tai ulkona; soutaja-2 ≥ 1 s, sitten 12 s:n ikkuna.
            if (!riitaKaynnissa && (riitaAsti -= Dt) <= 0)
            {
                riitaAsti = RiitaValiS;
                if (pv != null && pv.Aivot.Tila == VartijanTila.Partio && (osa == "vesiportti" || osa == "ulkoalue")) { riitaKaynnissa = true; riitaAlkaa = T + 1; }
            }
            if (riitaKaynnissa && riitaAlkaa > 0 && T >= riitaAlkaa) { pv.Aivot.AloitaRiita(vene.X, vene.Z); riitaAlkaa = -1; }
            else if (riitaKaynnissa && riitaAlkaa < 0 && pv.Aivot.Riita <= 0) riitaKaynnissa = false;
            // Tarkistuspiste portaalin ylityksestä, kun kukaan ei epäile.
            if (osa != null && osa != pelaajanOsa) { if (pelaajanOsa != null && !Vaara()) { Tarkistus = (PX, PY, PZ); TarkistusSeuraava = Seuraava; } pelaajanOsa = osa; }
            var aanet = new List<Aanilahde>(Jono); Jono.Clear();
            double sade = Askelaani.Sade(Askelaani.Pinta(d, PX, PY, PZ), Hiipii ? Liiketapa.Hiipiminen : Liiketapa.Kavely);
            if (vauhti > 0.3 && sade > 0 && !Tarjotin) aanet.Add(new Aanilahde(PX, PZ, sade, osa, PY));   // tarjotin kädessä: palvelijan askeleet (ei juoksua)
            bool piilossa = Piilossa();
            if (piilossa && !oliPiilossa) foreach (var h in Hahmot) if (h.Aktiivinen && h.Aivot.Mittari >= Vartija.TutkiHuippu && h.NakiViimeksi) { paljastui = true; break; }
            if (!piilossa) paljastui = false;
            if (paljastui) piilossa = false;
            oliPiilossa = piilossa;
            double valo = Valoisuus();
            foreach (var h in Hahmot)
            {
                if (!h.Aktiivinen) continue;
                // Yli 20 m:n päässä pelaajasta ja äänistä hahmo ei näe (ulottuma ≤ 15 m), kuule (≤ 16 m) eikä valaise (4 m): kevyt päivitys.
                bool kaukana = Etaisyys3(h.X, h.Y, h.Z, PX, PY, PZ) > KaukoM;
                foreach (var a in aanet) if (Etaisyys2(h.X, h.Z, a.X, a.Z) <= KaukoM) kaukana = false;
                if (kaukana)
                {
                    h.Aivot.Paivita(Dt, new VartijanSyote { VartijaX = h.X, VartijaZ = h.Z, PelaajaX = PX, PelaajaZ = PZ, Valoisuus = valo, PelaajaVauhti = vauhti });
                    h.NakiViimeksi = false; Liikuta(h);
                    continue;
                }
                if (h.Osa == null || h.OsaX != h.X || h.OsaY != h.Y || h.OsaZ != h.Z) { h.Osa = Askelaani.Osa(d, h.X, h.Y, h.Z) ?? ""; h.OsaX = h.X; h.OsaY = h.Y; h.OsaZ = h.Z; }
                string hosa = h.Osa.Length == 0 ? null : h.Osa;
                var kuuluvat = new List<Aanilahde>();
                foreach (var a in aanet) { double r = Askelaani.Kuuluvuus(d, a.KuuluvuusKorkeudella(h.Y), a.Osa, hosa); if (r > 0) kuuluvat.Add(new Aanilahde(a.X, a.Z, r, a.Osa, a.Y)); }
                if (h.KaantyyS > 0 && h.KaantyyVaihe < 3) Kaantyy(h);
                var s = new VartijanSyote { VartijaX = h.X, VartijaZ = h.Z, PelaajaX = PX, PelaajaZ = PZ, NakolinjaVapaa = Nakolinja(h, hosa, osa), Piilossa = piilossa || T < ArmoAsti,
                    Valoisuus = valo, Hiipii = Hiipii, PelaajaVauhti = vauhti, Aanet = kuuluvat, Tarjotin = Tarjotin, Naamio = Naamio && h.MerkkiOsa != NaamioEiKelpaaOsa };
                h.Aivot.Paivita(Dt, s);
                h.NakiViimeksi = s.NakolinjaVapaa && !s.Piilossa;
                if (EnsiHavainto < 0 && h.Aivot.Tila != VartijanTila.Partio && h.Aivot.Tila != VartijanTila.Paluu) EnsiHavainto = T;
                if (h.Aivot.Tila == VartijanTila.Kiinni)
                {
                    Kiinni++; if (!h.Aivot.Varoitettu) VaroitusRikki = true;
                    (PX, PY, PZ) = Tarkistus; Seuraava = TarkistusSeuraava; ArmoAsti = T + ArmoS; Tarjotin = false; pelaajanOsa = Askelaani.Osa(d, PX, PY, PZ);
                    foreach (var w in Hahmot) if (w.Aktiivinen) w.Aivot.Nollaa(w.X, w.Z, valpas: true);
                    return;
                }
                if (h.Aivot.Huuto)
                {
                    h.Aivot.Huuto = false; int tulee = 0;
                    foreach (var x in Hahmot) if (x != h && x.Aktiivinen && tulee < 2 && Etaisyys3(x.X, x.Y, x.Z, h.X, h.Y, h.Z) < HuutoM) { x.Aivot.Kutsu(h.Aivot.EpailyX, h.Aivot.EpailyZ); tulee++; }
                }
                Liikuta(h);
            }
        }

        static void Liikuta(Hahmo h)
        {
            double kx = h.Aivot.KohdeX - h.X, kz = h.Aivot.KohdeZ - h.Z, kd = Math.Sqrt(kx * kx + kz * kz);
            if (kd > 1e-6 && h.Aivot.Vauhti > 0)
            {
                double a = Math.Min(kd, h.Aivot.Vauhti * Dt); h.X += kx / kd * a; h.Z += kz / kd * a; h.Aivot.Yaw = Math.Atan2(kx, kz) * 180 / Math.PI;
                h.Y = YReitilla(h);
            }
        }

        /// <summary>SeikkailuVartijat.Kaantyy: 5 s pelaajan tultua 8 m:iin hahmo katsoo kaantyy_s käytävää kohti (ei uppoutunut), sitten palaa.</summary>
        void Kaantyy(Hahmo h)
        {
            if (h.KaantyyVaihe == 0 && Etaisyys3(h.X, h.Y, h.Z, PX, PY, PZ) < 8) { h.KaantyyVaihe = 1; h.KaantyyAika = T + 5; }
            else if (h.KaantyyVaihe == 1 && T >= h.KaantyyAika) { h.KaantyyVaihe = 2; h.KaantyyAika = T + h.KaantyyS; h.Aivot.Uppoutunut = false; h.Aivot.Yaw = h.AlkuYaw + 180; }
            else if (h.KaantyyVaihe == 2 && T >= h.KaantyyAika) { h.KaantyyVaihe = 3; h.Aivot.Yaw = h.AlkuYaw; h.Aivot.Uppoutunut = true; }
        }

        /// <summary>Hahmon korkeus lähimmältä reittiosuudelta (portaat nousevat tasaisesti).</summary>
        static double YReitilla(Hahmo h)
        {
            var p = h.Pisteet; if (p.Count == 1) return p[0].Y;
            double paras = double.MaxValue, y = p[0].Y;
            for (int i = 0; i < p.Count; i++)
            {
                var a = p[i]; var b = p[(i + 1) % p.Count];
                double ux = b.X - a.X, uz = b.Z - a.Z, uu = ux * ux + uz * uz;
                double t = uu < 1e-9 ? 0 : Math.Clamp(((h.X - a.X) * ux + (h.Z - a.Z) * uz) / uu, 0, 1);
                double e = Etaisyys2(a.X + ux * t, a.Z + uz * t, h.X, h.Z);
                if (e < paras) { paras = e; y = a.Y + (b.Y - a.Y) * t; }
            }
            return y;
        }
    }
}
