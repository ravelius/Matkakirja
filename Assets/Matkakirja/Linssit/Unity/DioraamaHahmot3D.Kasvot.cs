// SOUTAJAN KASVOT (Natiiviseppä 11.10.2026; omistaja: "Soutajan kasvot pitää animoida äärimmäisen hyvin, jotta puhe näyttää puheelta
// ja eleet tukevat tarinaa", PT:n suunnitelma 14.2x kohta 3): irrallisten hahmojen (veneen soutaja, seikkailun vartijat) FACEIT-kasvot,
// katse ja eleet seikkailun repliikkien tahdissa. Ennen tätä irrallinen hahmo ei räpäyttänyt eikä liikuttanut suuta (PaivitaIrrallinen
// ohitti PaivitaKasvot-kutsun).
// - Suu: Visemit repliikin merkkikohdistuksesta (SeikkailuRepliikit.PuheTila), leuka äänen voimakkuuden mukaan; ilman kohdistusta
//   leuka pelkästä voimakkuudesta.
// - Ilme: Kasvoilme-perusilme merkinnästä ("kasvot.ilme") pehmeästi vaihtuen + korostus (kulmat painollisilla sanoilla ja kysymyksen
//   lopussa); puheen jälkeen ilme pysyy hetken ja palaa neutraaliksi.
// - Katse: pää kääntyy katsojaan (pelaajan kamera, 1. persoona) puhuessa ja soutajalla myös lähellä ollessa; silmät tekevät loput
//   (eyeLook*-muodot, tai Eyes-luu pienellä rajalla) + Kasvoilmeen pikkuhypyt ja ajatuskatse lauseen alussa; alas katsottaessa
//   yläluomi seuraa. Korostus nyökäyttää päätä hieman.
// - Eleet: merkinnän eleet[] (sana kohdistuksesta tai t sekunteina) soivat soudun päällä: pään eleet vain pään ja kaulan luihin,
//   puhe ja osoitus (LR:n ele_puhe_istuen, ele_osoitus_portti) yläkehoon (jalat ja lantio jäävät soutuun).
// QA: "poikki kasvot 0|1", "poikki kasvot ilme <ilme>|pois", "poikki kasvot soita <tunnus>", "poikki kasvot tila".
using System;
using System.Collections.Generic;
using Matkakirja.Linssit.Dioraama;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public sealed partial class DioraamaHahmot3D
    {
        sealed partial class Esiintyma
        {
            /// <summary>Kasvot-listan rinnalla: Kasvoilme.Nimet-indeksit muotomeshittäin; SilmaKatse = eyeLook*-indeksit (SilmaNimet).</summary>
            public List<int[]> KasvoIlme, SilmaKatse;
            public float[] IlmeNyt;
            public float KatsePaino, Leuka;
            public double EdellinenKasvoT = double.NaN, PuheLoppui = double.NegativeInfinity;
            public string ViimeIlme;
            public int SilmatIndeksi = -2;
            // Eleet: soiva leike, alku, repliikki jonka merkintöjä luetaan, seuraava merkintä ja luumaskit.
            public string IrrEle; public double IrrEleAlku; public string EleTunnus; public int EleSeuraava;
            public float[] EleT, EleR, EleS; public bool[] PaaMaski, YlaMaski;
        }

        /// <summary>Katsojan kamera (DioraamaNayttamo asettaa): irrallisten hahmojen katse pelaajaan.</summary>
        public Func<Camera> KatsojanKamera;
        /// <summary>QA: kasvokerros pois/päällä ja pakotettu perusilme (null = merkinnän mukaan).</summary>
        public static bool KasvotPaalla = true;
        public static string PakotettuIlme;
        /// <summary>Viimeisin kasvotila lokiin ("poikki kasvot tila").</summary>
        public static string KasvoTila = "kasvot: ei irrallisia kasvoja";

        static readonly string[] SilmaNimet = { "eyeLookInLeft", "eyeLookOutLeft", "eyeLookUpLeft", "eyeLookDownLeft",
            "eyeLookInRight", "eyeLookOutRight", "eyeLookUpRight", "eyeLookDownRight" };
        static readonly Dictionary<string, string> EleLeikkeet = new Dictionary<string, string>(StringComparer.Ordinal)
        {
            ["nyokkays"] = "ele_nyokkays", ["pudistus"] = "ele_pudistus", ["kallistus"] = "ele_kallistus", ["kuuntelu"] = "ele_kuuntelu",
            ["puhe"] = "ele_puhe_istuen", ["osoitus"] = "ele_osoitus_portti",
        };
        static readonly HashSet<string> YlakehonEleet = new HashSet<string>(StringComparer.Ordinal) { "ele_puhe_istuen", "ele_osoitus_portti" };
        static readonly HashSet<string> puuttuvatEleet = new HashSet<string>(StringComparer.Ordinal);
        static readonly float[] ilmeTavoite = new float[Kasvoilme.Nimet.Length], korostus = new float[Kasvoilme.Nimet.Length];
        static readonly float[] silmaPainot = new float[8];
        static readonly double[] lauseAlut = new double[64];
        const float IlmeNopeus = 5f, KatseNousu = 1.5f, PaaMaxKatse = 40f, PaaPystyMax = 20f, SilmaMax = 30f, SilmaLuuMax = 4f;
        const double IlmePitoS = 1.5;

        static int[] MuotoIndeksit(Mesh m, string[] nimet)
        {
            var r = new int[nimet.Length]; bool jokin = false;
            for (int i = 0; i < nimet.Length; i++) { r[i] = m.GetBlendShapeIndex(nimet[i]); jokin |= r[i] >= 0; }
            return jokin ? r : null;
        }

        /// <summary>Rakenna: muotomeshin ilme- ja silmäindeksit Kasvot-listan rinnalle (sama järjestys).</summary>
        static void LisaaKasvoIndeksit(Esiintyma e, Mesh m)
        {
            (e.KasvoIlme ??= new List<int[]>()).Add(MuotoIndeksit(m, Kasvoilme.Nimet));
            (e.SilmaKatse ??= new List<int[]>()).Add(MuotoIndeksit(m, SilmaNimet));
        }

        void IrrallisenKasvot(Esiintyma e)
        {
            if (!KasvotPaalla) return;
            double t = Time.unscaledTimeAsDouble;
            float dt = double.IsNaN(e.EdellinenKasvoT) ? 0f : Mathf.Clamp((float)(t - e.EdellinenKasvoT), 0f, 0.1f);
            e.EdellinenKasvoT = t;
            int siemen = Siemen(e);
            SeikkailuRepliikit.PuheTila pt = default;
            bool puhuu = SeikkailuRepliikit.Aktiivinen != null && SeikkailuRepliikit.Aktiivinen.Puhuu(e.HahmoId, out pt);
            bool soutaja = e.HahmoId != null && e.HahmoId.StartsWith("soutaja", StringComparison.Ordinal);

            // 1) Eleet luihin (animaation päälle), sitten pää ja silmät, lopuksi muodot.
            if (puhuu) AjoitaIrrallisenEle(e, pt);
            SoitaIrrallisenEle(e, t);

            double lauseAlku = double.NaN;
            if (puhuu && pt.Kohdistus != null)
            {
                int n = Kasvoilme.LauseAlut(pt.Kohdistus, lauseAlut);
                for (int i = 0; i < n; i++) if (lauseAlut[i] <= pt.Kohta) lauseAlku = t - pt.Kohta + lauseAlut[i];
                Kasvoilme.Korostus(pt.Kohdistus, pt.Kohta, korostus);
            }
            else Array.Clear(korostus, 0, korostus.Length);
            float pulssi = Mathf.Clamp01(korostus[Kasvoilme.ISisa] / 0.3f);
            Kasvoilme.Katse(siemen, t, lauseAlku, out float sv, out float sp);

            var kamera = KatsojanKamera?.Invoke();
            float alas = KatsoKatsojaa(e, kamera, puhuu, soutaja, pt.Katse, dt, sv, sp, pulssi);

            if (e.Kasvot == null) { KasvoTila = $"kasvot: {e.HahmoId} ilman muotoja, puhuu {puhuu}"; return; }
            // 2) Suu.
            Array.Clear(suuPainot, 0, suuPainot.Length);
            if (puhuu)
            {
                e.Leuka = Mathf.Lerp(e.Leuka, pt.Taso, 0.35f);
                if (pt.Kohdistus != null)
                {
                    Visemit.Laske(pt.Kohdistus, pt.Kohta, suuPainot);
                    suuPainot[0] *= Mathf.Clamp(0.55f + 3f * e.Leuka, 0.6f, 1.2f);   // −17 dB:n puhe (RMS ~0,14) ≈ 1
                }
                else suuPainot[0] = Mathf.Clamp(e.Leuka * 3.5f, 0f, 0.7f);
            }
            else e.Leuka = 0f;
            // 3) Ilme: merkintä (tai QA), pysyy IlmePitoS puheen jälkeen.
            if (puhuu) { e.ViimeIlme = pt.Ilme; e.PuheLoppui = t; }
            string ilme = PakotettuIlme ?? (t - e.PuheLoppui < IlmePitoS ? e.ViimeIlme : null);
            Kasvoilme.Ilme(ilme, ilmeTavoite);
            e.IlmeNyt ??= new float[Kasvoilme.Nimet.Length];
            float k = 1f - Mathf.Exp(-IlmeNopeus * dt);
            for (int i = 0; i < ilmeTavoite.Length; i++) e.IlmeNyt[i] += (ilmeTavoite[i] - e.IlmeNyt[i]) * (dt <= 0f ? 1f : k);
            // 4) Räpäytys + yläluomi seuraa alas katsetta.
            float rap = Mathf.Max(Visemit.Rapaytys(siemen, t), Mathf.Clamp01(alas / 25f) * 0.3f);

            for (int m = 0; m < e.Kasvot.Count; m++)
            {
                var (r, suu, vasen, oikea) = e.Kasvot[m];
                if (r == null) continue;
                for (int v = 0; v < suu.Length; v++) if (suu[v] >= 0) r.SetBlendShapeWeight(suu[v], suuPainot[v] * 100f);
                if (vasen >= 0) r.SetBlendShapeWeight(vasen, rap * 100f);
                if (oikea >= 0) r.SetBlendShapeWeight(oikea, rap * 100f);
                var ii = e.KasvoIlme != null && m < e.KasvoIlme.Count ? e.KasvoIlme[m] : null;
                if (ii != null)
                    for (int i = 0; i < ii.Length; i++) if (ii[i] >= 0) r.SetBlendShapeWeight(ii[i], Mathf.Clamp01(e.IlmeNyt[i] + korostus[i]) * 100f);
                var si = e.SilmaKatse != null && m < e.SilmaKatse.Count ? e.SilmaKatse[m] : null;
                if (si != null)
                    for (int i = 0; i < si.Length; i++) if (si[i] >= 0) r.SetBlendShapeWeight(si[i], silmaPainot[i] * 100f);
            }
            KasvoTila = $"kasvot: {e.HahmoId} puhuu {(puhuu ? pt.Tunnus + $" {pt.Kohta:F2} s, kohdistus {(pt.Kohdistus != null ? "on" : "ei")}, taso {pt.Taso:F3}" : "ei")}, " +
                $"ilme {ilme ?? "neutraali"}, katse {e.KatsePaino:F2}, ele {e.IrrEle ?? "-"}, leuka {suuPainot[0]:F2}";
        }

        /// <summary>Pää kohti katsojaa painolla (puhuessa 1, soutajalla lähellä 0,6), loput silmillä + pikkuhypyt. Palauttaa silmien
        /// alaskatseen asteina (yläluomi seuraa).</summary>
        float KatsoKatsojaa(Esiintyma e, Camera kamera, bool puhuu, bool soutaja, string kohde, float dt, float sv, float sp, float pulssi)
        {
            Array.Clear(silmaPainot, 0, silmaPainot.Length);
            if (e.PaaIndeksi == -2)
            {
                e.PaaIndeksi = -1;
                for (int i = 0; i < e.SolmuT.Length; i++)
                {
                    string n = e.SolmuT[i].name.ToLowerInvariant();
                    if (n.EndsWith("head") || n == "head" || n.EndsWith(":head") || n.EndsWith("_head")) { e.PaaIndeksi = i; break; }
                }
            }
            if (e.SilmatIndeksi == -2)
            {
                e.SilmatIndeksi = -1;
                for (int i = 0; i < e.SolmuT.Length; i++) if (e.SolmuT[i].name == "Eyes") { e.SilmatIndeksi = i; break; }
            }
            if (e.PaaIndeksi < 0 || kamera == null) return 0f;
            var paa = e.SolmuT[e.PaaIndeksi];
            var juuri = e.Juuri.transform;
            float etaisyys = Vector3.Distance(kamera.transform.position, paa.position);
            float tavoite = puhuu ? 1f : soutaja && etaisyys < 8f ? 0.6f : 0f;
            e.KatsePaino = Mathf.MoveTowards(e.KatsePaino, tavoite, KatseNousu * dt);

            var eteen = -juuri.forward;   // skinnatun mallin kasvot (kuten PaaKatse)
            var oikea = Vector3.Cross(Vector3.up, eteen).normalized;
            Vector3 haluttu = kamera.transform.position - paa.position;
            if (kohde == "vesi") haluttu = Quaternion.AngleAxis(25f, oikea) * eteen;   // katse alas veteen veneen edessä
            var vaaka = new Vector3(haluttu.x, 0f, haluttu.z);
            float maxY = vaaka.magnitude * Mathf.Tan(PaaPystyMax * Mathf.Deg2Rad);
            var paaSuunta = new Vector3(haluttu.x, Mathf.Clamp(haluttu.y, -maxY, maxY), haluttu.z);
            Quaternion kierto = Quaternion.identity;
            if (paaSuunta.sqrMagnitude > 1e-4f && e.KatsePaino > 0f)
            {
                Quaternion.FromToRotation(eteen, paaSuunta.normalized).ToAngleAxis(out float kulma, out Vector3 akseli);
                if (kulma > 180f) kulma -= 360f;
                kierto = Quaternion.AngleAxis(Mathf.Clamp(kulma, -PaaMaxKatse, PaaMaxKatse) * 0.8f * e.KatsePaino, akseli);
            }
            // Korostuksen pieni nyökkäys (alas painollisella tavulla).
            if (puhuu && pulssi > 0f) kierto = Quaternion.AngleAxis(2.5f * pulssi, oikea) * kierto;
            paa.rotation = kierto * paa.rotation;

            // Silmät: pään jälkeen jäljellä oleva ero + pikkuhypyt, hahmon kehyksessä (kasvot −Z; + vaaka = hahmon oikealle).
            var paaEteen = kierto * eteen;
            var silma = e.KatsePaino > 0.05f ? haluttu.normalized : paaEteen;
            silma = Quaternion.AngleAxis(sv, Vector3.up) * Quaternion.AngleAxis(-sp, oikea) * silma;
            var lp = juuri.InverseTransformDirection(paaEteen); var ls = juuri.InverseTransformDirection(silma);
            float yaw = Vector3.SignedAngle(new Vector3(lp.x, 0f, lp.z), new Vector3(ls.x, 0f, ls.z), Vector3.up);
            float pitch = Mathf.Asin(Mathf.Clamp(ls.y, -1f, 1f)) * Mathf.Rad2Deg - Mathf.Asin(Mathf.Clamp(lp.y, -1f, 1f)) * Mathf.Rad2Deg;
            yaw = Mathf.Clamp(yaw, -SilmaMax, SilmaMax); pitch = Mathf.Clamp(pitch, -SilmaMax, SilmaMax);
            bool muodot = false;
            if (e.SilmaKatse != null) foreach (var si in e.SilmaKatse) muodot |= si != null;
            if (muodot)
            {
                float y = Mathf.Abs(yaw) / SilmaMax, yl = Mathf.Max(0f, pitch) / 20f, al = Mathf.Max(0f, -pitch) / 20f;
                if (yaw > 0f) { silmaPainot[0] = y; silmaPainot[5] = y; } else { silmaPainot[1] = y; silmaPainot[4] = y; }
                silmaPainot[2] = silmaPainot[6] = Mathf.Clamp01(yl); silmaPainot[3] = silmaPainot[7] = Mathf.Clamp01(al);
            }
            else if (e.SilmatIndeksi >= 0)
            {
                // Yksi Eyes-luu molemmille silmille: vain pieni kierto (keskipisteen ympäri isompi kääntö siirtäisi silmät kuopista).
                var silmat = e.SolmuT[e.SilmatIndeksi];
                float by = Mathf.Clamp(yaw, -SilmaLuuMax, SilmaLuuMax), bp = Mathf.Clamp(pitch, -SilmaLuuMax, SilmaLuuMax);
                silmat.rotation = Quaternion.AngleAxis(by, Vector3.up) * Quaternion.AngleAxis(-bp, oikea) * silmat.rotation;
            }
            return Mathf.Max(0f, -pitch);
        }

        /// <summary>Merkinnän eleet[] repliikin kohdan mukaan: sana → sanan ensimmäisen esiintymän alku kohdistuksessa (0,15 s ennakko).</summary>
        void AjoitaIrrallisenEle(Esiintyma e, SeikkailuRepliikit.PuheTila pt)
        {
            if (pt.Tunnus != e.EleTunnus) { e.EleTunnus = pt.Tunnus; e.EleSeuraava = 0; }
            if (pt.Eleet == null) return;
            while (e.EleSeuraava < pt.Eleet.Count)
            {
                var (sana, tt, ele) = pt.Eleet[e.EleSeuraava];
                double hetki = !string.IsNullOrEmpty(sana) ? SananAlku(pt.Kohdistus, sana) : tt;
                if (double.IsNaN(hetki)) { e.EleSeuraava++; continue; }   // sanaa ei löydy tai ei kohdistusta → ohitetaan
                if (pt.Kohta < hetki - 0.15) return;
                e.EleSeuraava++;
                if (!EleLeikkeet.TryGetValue(ele, out var leike)) leike = ele.StartsWith("ele_", StringComparison.Ordinal) ? ele : "ele_" + ele;
                if (e.Malli.Glb.Animaatio(leike) == null)
                {
                    if (puuttuvatEleet.Add(e.HahmoId + "/" + leike)) Debug.Log($"MATKAKIRJA seikkailu: kasvot: {e.HahmoId} ilman leikettä {leike} (LR)");
                    continue;
                }
                e.IrrEle = leike; e.IrrEleAlku = Time.unscaledTimeAsDouble;
            }
        }

        static double SananAlku(Kohdistus k, string sana)
        {
            if (k == null || string.IsNullOrEmpty(sana)) return double.NaN;
            int i = 0;
            while ((i = k.Merkit.IndexOf(sana, i, StringComparison.OrdinalIgnoreCase)) >= 0)
            {
                if (i == 0 || !char.IsLetter(k.Merkit[i - 1])) return k.Alut[i];
                i++;
            }
            return double.NaN;
        }

        /// <summary>Soiva ele soudun päälle: pään eleet pään ja kaulan luihin, puhe ja osoitus yläkehoon; häivytys 0,2 s sisään, 0,3 s ulos.</summary>
        void SoitaIrrallisenEle(Esiintyma e, double t)
        {
            if (e.IrrEle == null || e.Sekoitin == null) return;
            var anim = e.Malli.Glb.Animaatio(e.IrrEle);
            double d = t - e.IrrEleAlku;
            if (anim == null || d > anim.Kesto) { e.IrrEle = null; return; }
            var sk = e.Sekoitin;
            if (e.EleT == null) { e.EleT = (float[])sk.T.Clone(); e.EleR = (float[])sk.R.Clone(); e.EleS = (float[])sk.S.Clone(); }
            if (e.PaaMaski == null)
            {
                e.PaaMaski = new bool[e.SolmuT.Length]; e.YlaMaski = new bool[e.SolmuT.Length];
                for (int i = 0; i < e.SolmuT.Length; i++)
                {
                    string n = e.SolmuT[i].name.ToLowerInvariant();
                    e.PaaMaski[i] = n.Contains("head") || n.Contains("neck");
                    e.YlaMaski[i] = !(n.Contains("hip") || n.Contains("pelvis") || n.Contains("leg") || n.Contains("thigh") || n.Contains("calf")
                        || n.Contains("foot") || n.Contains("toe") || n.Contains("root") || n == "armature");
                }
            }
            var maski = YlakehonEleet.Contains(e.IrrEle) ? e.YlaMaski : e.PaaMaski;
            float w = Mathf.Min(Mathf.Clamp01((float)(d / 0.2)), Mathf.Clamp01((float)((anim.Kesto - d) / 0.3)));
            DioraamaSekoitin.Nayte(anim, (float)d, e.EleT, e.EleR, e.EleS);
            foreach (var kk in anim.Kanavat)
            {
                int i = kk.Solmu; if (kk.Polku != 1 || i < 0 || i >= e.SolmuT.Length || !maski[i]) continue;
                var tr = e.SolmuT[i];
                tr.localRotation = Quaternion.Slerp(tr.localRotation, new Quaternion(e.EleR[i * 4], e.EleR[i * 4 + 1], e.EleR[i * 4 + 2], e.EleR[i * 4 + 3]), w);
            }
        }
    }
}
