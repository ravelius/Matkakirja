// LIVIAN PÄÄ (Natiivi-UI, 23.9.2026): js/livia-svg-paa.js:n livianSvgPaa.
//
// Hyväksytyn kokopulun pää: kasvon muoto pysyy samana, ilmeen osat
// (silmäluomet, kulmat, katse, nokan ammotus, posket, lasit) liikkuvat.
// Kiinteät polut ovat merkkijonovakioita (jäsennetään kerran); silmät ja nokka
// kirjoitetaan komentoina. Silmän clip-path tehdään Kokoaja.Rajaa-ellipsillä.
//
// Käsin piirretyt versiot (js/livia-uudet-versiot.js, paa()) interpoloivat
// pään JOKAISEN geometrialuvun ilmepohjien välillä (rest, glance, shock,
// blink, smile, grin, disbelief, yawn, down, smug). Koska kaikki pohjat
// tuottavat saman komentorakenteen ja pisteet ovat lähdelukujen lineaarisia
// yhdistelmiä, sama interpolointi tehdään valmiille komentolistalle (Dyn) ja
// rajausellipseille; pään kierto (rotate twist 57 74) interpoloidaan erikseen.
using System.Collections.Generic;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    internal static class LiviaPaa
    {
        static readonly Color Pohja = Kokoaja.Vari("#8d9da5"), Varjo = Kokoaja.Vari("#657c89"), VarjoPeili = Kokoaja.Vari("#a4b2b8");
        static readonly Color Valo = Kokoaja.Vari("#acb7bb"), ValoPeili = Kokoaja.Vari("#748b97");
        static readonly Color Kaula = Kokoaja.Vari("#668b83"), Kaula2 = Kokoaja.Vari("#788297"), KaulaViiva = Kokoaja.Vari("#8ba69c");
        static readonly Color Poski = Kokoaja.Vari("#a3b0b5"), Poski2 = Kokoaja.Vari("#7b919c");
        static readonly Color Valkuainen = Kokoaja.Vari("#b8b8a3"), Iiris = Kokoaja.Vari("#cf9652"), IirisManic = Kokoaja.Vari("#dfac51");
        static readonly Color Sydan = Kokoaja.Vari("#975d65"), Pupilli = Kokoaja.Vari("#263840"), Kiilto = Kokoaja.Vari("#eeeadd");
        static readonly Color LuomiKauko = Kokoaja.Vari("#92a0a7"), LuomiLahi = Kokoaja.Vari("#7b8d97"), LuomiViiva = Kokoaja.Vari("#536a76");
        static readonly Color NokkaEtu = Kokoaja.Vari("#334d5b"), NokkaEtu2 = Kokoaja.Vari("#82979f"), NokkaVaalea = Kokoaja.Vari("#e3e2d6");
        static readonly Color Nokka1 = Kokoaja.Vari("#2e4756"), Nokka2 = Kokoaja.Vari("#6c8490"), Nokka3 = Kokoaja.Vari("#526b79"), Nokka4 = Kokoaja.Vari("#9baaae");
        static readonly Color Hymy = Kokoaja.Vari("#334e5b"), Lasit = Kokoaja.Vari("#655a48"), LasiKiilto = Kokoaja.Vari("#eee9d9");
        static readonly Color Puna = Kokoaja.Vari("#b28d89"), Muru = Kokoaja.Vari("#c89653");

        const string PaaPohja = "M29 36Q33 27 44 26Q57 22 70 26Q83 28 86 40Q90 52 82 65Q79 70 81 73L85 74L79 78Q79 91 71 98L68 95L65 100Q53 104 42 95Q37 90 38 80Q34 73 31 65Q24 60 24 51Q24 42 29 36Z";
        const string PaaVarjo = "M62 26Q80 27 84 43Q87 53 79 72L82 75L77 78Q79 90 71 98L68 95L65 100Q56 104 47 98Q61 84 59 73Q70 61 70 47Q70 34 62 26Z";
        const string PaaValo = "M29 40Q34 29 45 29Q59 25 71 30Q61 28 53 34Q44 39 40 45Q31 50 27 55Q24 48 29 40Z";
        const string KaulaD = "M39 78Q46 72 54 77Q63 80 66 87Q68 94 65 100Q53 101 44 94Q39 88 39 78Z";
        const string Kaula2D = "M54 79Q63 84 66 90Q70 88 76 83Q77 93 70 97L66 95L65 100Q62 98 61 94Q59 85 54 79Z";
        const string KaulaViivaD = "M42 78Q46 78 49 81M46 85Q50 86 53 89";
        const string NokkaEtu2D = "M48 58Q53 55 59 59L53 65L46 63Z";
        const string NokkaEtuValo = "M49 58Q49 54 54 55Q58 54 59 59L54 61Z";
        const string Nokka3D = "M32 57Q37 55 42 59L46 63Q38 66 19 68Q22 64 26 61Z";
        const string Nokka4D = "M31 59Q35 57 40 60Q30 65 21 67L27 63Z";
        const string NokkaValo = "M27 59Q28 54 33 55Q36 51 39 55Q42 56 41 60Q35 59 32 62Z";
        const string HymyD = "M24 67Q38 71 46 62";
        const string PunaD = "M48 58l5 1M72 57l4 1";
        const string MurutD = "M26 67l3-1 1 3-3 1Z M39 71l2 1-1 2-2-1Z";
        // Kirjan selauksen lasit (paa(): onKirja), pään kierron sisällä.
        const string KirjaLasiKauko = "M28.5 45.5A8.5 9 0 1 0 45.5 45.5A8.5 9 0 1 0 28.5 45.5Z";
        const string KirjaLasiLahi = "M48 42.75A13 12 0 1 0 74 42.75A13 12 0 1 0 48 42.75Z";
        const string KirjaLasiSanka = "M45.5 43.5Q47 37 48 40.75m26-1l8-5m-53.5 9l-4-3";
        const string KirjaLasiKiilto = "M55 36.75l4-2";

        static bool On(string f, string a, string b = null, string c = null, string d = null) => f == a || (b != null && f == b) || (c != null && f == c) || (d != null && f == d);
        static bool Lempea(string f) => f == "rest" || f == "front" || f == "talk" || f == "talkSmall" || f == "glance" || f == "up" || f == "down";

        /// <summary>Pään kierto (twist): positiivinen nostaa vasemmalle osoittavaa nokkaa.</summary>
        public static float Kierto(string f, bool katseYlos)
        {
            bool ylakatselu = katseYlos || f == "up";
            bool shy = On(f, "embarrassed", "fluster");
            return ylakatselu ? 18 : f == "preen" ? 28 : f == "down" ? 8 : shy ? 5 : Lempea(f) ? 1.2f : 0;
        }

        /// <summary>
        /// livianSvgPaa. Kokoajan nykyinen matriisi = pään koordinaatisto
        /// (webin translate(44 61) scale(1 .87) -ryhmän sisus).
        /// </summary>
        public static void Piirra(Kokoaja k, string f, string suu, int n, bool katseYlos, float lasit, float lasitYlos,
            float lean, float strength, bool hymy = true, float kiertoYli = float.NaN, bool kirjaLasit = false)
        {
            f = string.IsNullOrEmpty(f) ? "rest" : f;
            bool shock = On(f, "shock", "eyes", "fluster"), shy = On(f, "embarrassed", "fluster");
            bool sleepy = On(f, "sleep", "blink"), manic = On(f, "manic", "chewManic");
            bool gentle = Lempea(f);
            float yaw = f == "right" ? 1 : f == "left" ? -1 : f == "front" ? 0 : -.25f * (1 - lean);
            float front = Mathf.Max(0, 1 - Mathf.Abs(yaw) * 2.5f);
            bool mirror = yaw > .5f;
            float nearX = 61, farX = 34 + front * 8, nearY = 42 + front * 2, farY = 46 - front * 2;
            float lid = f == "smug" ? 1.06f : f == "bored" ? 1.45f : f == "angry" ? .5f : shock ? .05f : manic ? .02f : shy ? .45f : gentle ? .52f : .66f;
            if (f == "yawn") lid = 1.35f;
            if (f == "smile" || f == "wink") lid = .35f;
            bool ylakatselu = katseYlos || f == "up";
            if (ylakatselu) lid = .25f;
            float lookX = ylakatselu ? -3 : f == "glance" ? 4 : f == "disbelief" ? -3 : shy ? 3 : f == "crumb" || f == "caught" ? -3 : 0;
            float lookY = ylakatselu ? -4 : f == "down" ? 3 : f == "preen" ? 4 : shy ? 2 : 0;
            string mouth = string.IsNullOrEmpty(suu) ? f : suu;
            float gape = mouth == "yawn" ? 1 : mouth == "shock" ? .9f : mouth == "talk" ? .7f : mouth == "talkSmall" ? .3f
                : mouth == "chew" || mouth == "chewManic" ? .2f + (n % 2) * .2f : 0;
            bool puff = f == "puff", chew = On(f, "chew", "chewManic", "crumb");
            float twist = float.IsNaN(kiertoYli) ? Kierto(f, katseYlos) : kiertoYli;

            var ryhma = Affiini.Yksikko;
            if (mirror) ryhma = ryhma.Siirra(112, 0).Skaalaa(-1, 1);
            k.Ryhma(ryhma.Kierra(twist, 57, 74));

            k.Tayta(PaaPohja, Pohja);
            k.Tayta(PaaVarjo, mirror ? VarjoPeili : Varjo);
            k.Tayta(PaaValo, mirror ? ValoPeili : Valo);
            k.Tayta(KaulaD, Kaula);
            k.Tayta(Kaula2D, Kaula2);
            k.Viiva(KaulaViivaD, KaulaViiva, 1.4f);
            if (puff || chew)
            {
                k.TaytaEllipsi(38, 66, puff ? 12 + strength * 3 : 8 + n % 2, 10, Poski);
                k.TaytaEllipsi(72, 65, puff ? 12 + strength * 3 : 7 + n % 2, 11, Poski2);
            }

            void Silma(float x, float y, float rx, float ry, bool far)
            {
                bool joy = On(f, "smile", "grin", "wink");
                bool closed = sleepy || f == "grin" || (On(f, "happy", "wink") && far);
                float brow = joy ? 0 : f == "angry" ? (far ? .5f : -.5f) : shy ? (far ? -.3f : .48f) : f == "disbelief" ? (far ? .1f : -.5f)
                    : gentle || ylakatselu ? (far ? .07f : -.07f) : far ? .24f : -.28f;
                float l = closed ? 2.2f : lid + (f == "disbelief" ? (far ? -.55f : .55f) : 0), edge = y - ry + ry * l;
                float px = x + lookX, py = y + lookY, pr = manic ? 1.6f : shock ? 2 : far ? 2.1f : 2.9f;
                k.Rajaa(x, y, rx, ry);
                k.TaytaEllipsi(x, y, rx, ry, Valkuainen);
                k.TaytaEllipsi(x, y + .5f, rx - 1.3f, ry - 1, manic ? IirisManic : Iiris);
                if (f == "love")
                {
                    k.Alku();
                    k.M(px, py + 4); k.C(px - 9, py - 1, px - 5, py - 8, px, py - 4); k.C(px + 5, py - 8, px + 9, py - 1, px, py + 4); k.Z();
                    k.TaytaDyn(Sydan);
                }
                else
                {
                    k.TaytaEllipsi(px, py, pr, pr * 1.2f, Pupilli);
                    k.TaytaEllipsi(px - .8f, py - 1.2f, .8f, .8f, Kiilto);
                }
                k.Alku();
                k.M(x - rx - 2, y - ry - 2); k.L(x + rx + 2, y - ry - 2); k.L(x + rx + 2, edge + rx * brow);
                k.Q(x, edge, x - rx - 2, edge - rx * brow); k.Z();
                k.TaytaDyn(far ? LuomiKauko : LuomiLahi);
                k.RajausLoppu();
                k.Alku();
                k.M(x - rx, closed ? y : edge - rx * brow);
                k.Q(x, closed ? (joy ? y - 5 : y + 2) : edge + 1, x + rx, closed ? y : edge + rx * brow);
                k.ViivaDyn(LuomiViiva, 1.3f);
            }
            Silma(farX, farY, (shock ? 7 : 5.2f) + front * 3, shock ? 10 : 6.6f, true);
            Silma(nearX, nearY, manic ? 12.5f : shock ? 12 : 10.2f, shock ? 14 : manic ? 12 : 10, false);

            if (f == "front")
            {
                k.Alku(); k.M(48, 58); k.Q(53, 55, 59, 59); k.L(55, 66 + gape * 10); k.L(46, 64); k.Z(); k.TaytaDyn(NokkaEtu);
                k.Tayta(NokkaEtu2D, NokkaEtu2);
                k.Tayta(NokkaEtuValo, NokkaVaalea);
            }
            else
            {
                k.Alku(); k.M(30, 60); k.L(44, 61); k.L(40, 65 + gape * 10); k.L(21, 68 + gape * 4); k.Z(); k.TaytaDyn(Nokka1);
                k.Alku(); k.M(21, 68 + gape * 4); k.Q(32, 70 + gape * 7, 41, 65 + gape * 10); k.L(43, 64); k.Z(); k.TaytaDyn(Nokka2);
                k.Tayta(Nokka3D, Nokka3);
                k.Tayta(Nokka4D, Nokka4);
                k.Tayta(NokkaValo, NokkaVaalea);
            }
            if (hymy && On(f, "smile", "grin", "wink")) k.Viiva(HymyD, Hymy, 1.7f);
            if (lasit > 0)
            {
                k.Ryhma(Affiini.Yksikko.Siirra(0, (1 - lasit) * 42 - lasitYlos), Mathf.Min(1, lasit * 3));
                k.Alku(); k.Ellipsi(farX, farY, 8.5f, 9); k.ViivaDyn(Lasit, 2.2f, false);
                k.Alku(); k.Ellipsi(nearX, nearY, 13, 12); k.ViivaDyn(Lasit, 2.2f, false);
                k.Alku();
                k.M(farX + 8.5f, farY - 2); k.Q(47, 37, nearX - 13, nearY - 2);
                k.M(nearX + 13, nearY - 3); k.Lr(8, -5);
                k.M(farX - 8.5f, farY - 3); k.Lr(-4, -3);
                k.ViivaDyn(Lasit, 2.2f, false);
                k.Alku(); k.M(nearX - 6, nearY - 6); k.Lr(4, -2); k.ViivaDyn(LasiKiilto, 1.5f, false);
                k.Loppu();
            }
            if (shy) k.Viiva(PunaD, Puna, 2.5f);
            if (On(f, "crumb", "caught", "chew", "chewManic")) k.Tayta(MurutD, Muru);
            if (kirjaLasit)
            {
                k.Viiva(KirjaLasiKauko, Lasit, 2.2f, false);
                k.Viiva(KirjaLasiLahi, Lasit, 2.2f, false);
                k.Viiva(KirjaLasiSanka, Lasit, 2.2f, false);
                k.Viiva(KirjaLasiKiilto, LasiKiilto, 1.5f, false);
            }
            k.Loppu();
        }

        // --- käsin piirrettyjen versioiden ilmepohjat (paa()) ------------------------

        sealed class Ilmepohja
        {
            public SvgPolku.Komento[] Dyn;
            public Vector4[] Leikkeet;
            public float Kierto;
        }

        static readonly Dictionary<string, Ilmepohja> pohjat = new Dictionary<string, Ilmepohja>();
        static readonly Kokoaja pohjaKokoaja = new Kokoaja();

        static Ilmepohja Pohjana(string f)
        {
            if (pohjat.TryGetValue(f, out var p)) return p;
            pohjaKokoaja.Tyhjenna();
            Piirra(pohjaKokoaja, f, null, 0, false, 0, 0, 0, .5f, hymy: false);
            p = new Ilmepohja { Dyn = pohjaKokoaja.Dyn.ToArray(), Leikkeet = pohjaKokoaja.Leikkeet.ToArray(), Kierto = Kierto(f, false) };
            pohjat[f] = p;
            return p;
        }

        /// <summary>
        /// paa(s): käsin piirretyn version pää. ilme = ilmepohja, johon
        /// ilme-rata vie; katse sekoittaa glance-pohjaa, räpäytys lopuksi blink-pohjaa.
        /// </summary>
        public static void PiirraKasin(Kokoaja k, string ilmeFrame, float ilme, float katse, float rapaytys, bool kirjaLasit)
        {
            var lepo = Pohjana("rest");
            var kohde = Pohjana(ilmeFrame);
            var vilkaisu = Pohjana("glance");
            var rapsa = Pohjana("blink");
            float Sekoita(float l, float i, float g, float b)
            {
                float avoin = l + (i - l) * ilme + (g - l) * katse;
                return avoin + (b - avoin) * rapaytys;
            }
            Vector2 SekoitaV(Vector2 l, Vector2 i, Vector2 g, Vector2 b) => new Vector2(Sekoita(l.x, i.x, g.x, b.x), Sekoita(l.y, i.y, g.y, b.y));

            float kierto = Sekoita(lepo.Kierto, kohde.Kierto, vilkaisu.Kierto, rapsa.Kierto);
            int dynAlku = k.Dyn.Count, leikeAlku = k.Leikkeet.Count;
            Piirra(k, "rest", null, 0, false, 0, 0, 0, .5f, hymy: false, kiertoYli: kierto, kirjaLasit: kirjaLasit);
            int maara = lepo.Dyn.Length;
            if (kohde.Dyn.Length != maara || vilkaisu.Dyn.Length != maara || rapsa.Dyn.Length != maara || k.Dyn.Count - dynAlku < maara)
            {
                Debug.LogWarning("MATKAKIRJA livia: ilmepohjien rakenne eroaa, pää ilman interpolointia");
                return;
            }
            for (int i = 0; i < maara; i++)
            {
                var l = lepo.Dyn[i];
                k.Dyn[dynAlku + i] = new SvgPolku.Komento(l.Laji,
                    SekoitaV(l.A, kohde.Dyn[i].A, vilkaisu.Dyn[i].A, rapsa.Dyn[i].A),
                    SekoitaV(l.B, kohde.Dyn[i].B, vilkaisu.Dyn[i].B, rapsa.Dyn[i].B),
                    SekoitaV(l.C, kohde.Dyn[i].C, vilkaisu.Dyn[i].C, rapsa.Dyn[i].C));
            }
            for (int i = 0; i < lepo.Leikkeet.Length && leikeAlku + i < k.Leikkeet.Count; i++)
            {
                Vector4 l = lepo.Leikkeet[i], a = kohde.Leikkeet[i], g = vilkaisu.Leikkeet[i], b = rapsa.Leikkeet[i];
                k.Leikkeet[leikeAlku + i] = new Vector4(Sekoita(l.x, a.x, g.x, b.x), Sekoita(l.y, a.y, g.y, b.y), Sekoita(l.z, a.z, g.z, b.z), Sekoita(l.w, a.w, g.w, b.w));
            }
        }
    }
}
