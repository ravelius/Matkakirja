// HISTORIAMOOTTORI: VIHJEET MAAILMAN VALONA UNITYSSA (Siirtoseppä 7.10.2026; pelattavuusmalli kohta 5; ydin Seikkailu.Vihjeet).
// OMISTAJAN PÄÄTÖS 8.10. 19.0x: Pulu pois pelistä. Vihjepyyntö (Natiivi-UI → SeikkailuPelaaja.VihjePyydetty) tai jumi (180 s ilman
// edistystä) antaa vihjeen ilman sanoja ja hahmoa: kohteessa hento kimallus (Ydin ValoVihje; ulkona kuunvalo, sisällä liekin sävy) ja
// pieni hopean kilahdus; taso 1 himmeä ja lyhyt, taso 2 kirkkaampi, taso 3 sykkii, kunnes pelaaja on kohteella. Kohde huoneen ja kappelin
// vaiheen mukaan; M-osassa (huoneet 6–10, kappelin jälkeen) Ydin MVihjeet edistyksestä (LS2 8.10.), ja sen eteneminen nollaa jumiajastimen.
// Ensivihje laiturilla (Ydin LaituriVihje, LS2 8.10., omistajan palaute (6)): kerran taso 2 vesiportin portilla, kun riita alkaa
// tai 15 s laiturille nousun jälkeen.
using System;
using Matkakirja.Linssit.Seikkailu;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public sealed class SeikkailuVihjeet : MonoBehaviour
    {
        public static SeikkailuVihjeet Aktiivinen { get; private set; }
        readonly Vihjeet ydin = new Vihjeet();
        readonly LaituriVihje laituri = new LaituriVihje();
        readonly ValoVihje valo = new ValoVihje();
        Light kimallus;
        /// <summary>Kimalluksen perusvoimakkuus ja kantama (ValoVihje.Kirkkaus 1 = liekin hehku, SeikkailuValot.Hehku).</summary>
        const float KimallusVoima = 1.6f, KimallusKantama = 2.2f, KimallusNosto = 0.35f;
        Action<string> kirjaa;
        public Vihjeet Ydin => ydin;

        public static SeikkailuVihjeet Luo(Transform isa, Action<string> kirjaa)
        {
            Poista();
            var go = new GameObject("Seikkailu vihjeet"); go.transform.SetParent(isa, false);
            var v = go.AddComponent<SeikkailuVihjeet>(); v.kirjaa = kirjaa; Aktiivinen = v;
            SeikkailuPelaaja.VihjePyydetty = v.Pyydetty;
            SeikkailuVartijat.Tarkistuspiste += v.UusiOsa;
            SeikkailuEsineet.Nostettiin += v.Edistys; SeikkailuEsineet.AsetettiinAlttarille += v.Edistys; SeikkailuEsineet.Raapaistiin += v.Edistys0;
            SeikkailuKynttilat.LuukkuAani += v.EdistysP;
            SeikkailuVartijat.RiitaAlkoi += v.laituri.RiitaAlkoi;
            v.ydin.UusiHuone(); luukkuNahty = false;
            return v;
        }

        void UusiOsa(string osa, Vector3 p) => ydin.UusiHuone();
        void Edistys(string id) => ydin.Edistys();
        void Edistys0() => ydin.Edistys();
        void EdistysP(Vector3 p) { ydin.Edistys(); luukkuNahty = true; }   // luukku avattu kerran: vihje siirtyy seinään

        static bool Vaara(SeikkailuPelaaja p)
        {
            if (SeikkailuVartijat.Vaara(p.transform.position, 0f)) return true;
            var a = SeikkailuVartijat.Aktiivinen;
            return a != null && SeikkailuVartijat.Vaara(p.transform.position, 15f) && a.SydanLyo;
        }

        bool Pyydetty()
        {
            var p = SeikkailuPelaaja.Aktiivinen; if (p == null) return false;
            int taso = ydin.Pyyda(Vaara(p));
            if (taso == 0) return true;   // liian pian: napautus käytetty, ei uutta vihjettä
            Nayta(p, taso, "pyyntö");   // kieli: ei (tekninen)
            return true;
        }

        void Update()
        {
            var p = SeikkailuPelaaja.Aktiivinen; if (p == null) return;
            var k = SeikkailuKappeli.Aktiivinen;
            bool keskustelu = k != null && k.Nyt == SeikkailuKappeli.Vaihe.Kohtaus;
            if (MOsassa() && MVihjeet.Vaihe(MTila(p)) is int mv && mv > mVaihe) { if (mVaihe >= 0) ydin.Edistys(); mVaihe = mv; }
            if (ydin.Paivita(Time.deltaTime, Vaara(p), keskustelu || p.Eleessa) == 2) Nayta(p, 2, "jumi");
            Laituri(p);
            Kimallus(p);
        }

        /// <summary>Kimalluksen valo seuraa ValoVihjeen kirkkautta; pelaajan etäisyys kohteeseen sammuttaa tason 3 sykkeen.</summary>
        void Kimallus(SeikkailuPelaaja p)
        {
            if (!valo.Kaynnissa && (kimallus == null || kimallus.intensity <= 0f)) return;
            var q = valo.Kohde; var pp = p.transform.position;
            float etaisyys = new Vector2(pp.x - (float)q.X, pp.z + (float)q.Z).magnitude;   // Kohde glTF-kehyksessä (z etelä)
            valo.Paivita(Time.deltaTime, etaisyys);
            if (kimallus != null) kimallus.intensity = KimallusVoima * (float)valo.Kirkkaus;
        }

        /// <summary>Laiturin ensivihje: pelaaja laiturilla tai vesiportilla huoneissa 1–2 (ei M-osan pakoa rannalla eikä jatkoa myöhemmästä).</summary>
        void Laituri(SeikkailuPelaaja p)
        {
            if (laituri.Valmis) return;
            var pp = p.transform.position; var d = SeikkailuKavely.Data;
            if (d == null || !(Merkki(LaituriVihje.Kohde) is Vector3 portti)) return;
            string osa = Askelaani.Osa(d, pp.x, pp.y, -pp.z);
            bool laiturilla = (SeikkailuTietokerros.Aktiivinen?.Huone ?? 0) <= 2 && !MOsassa() && (osa == "ulkoalue" || osa == "vesiportti");
            float porttiin = new Vector2(pp.x - portti.x, pp.z - portti.z).magnitude;
            if (laituri.Paivita(Time.deltaTime, laiturilla, porttiin, Vaara(p))) Nayta(p, 2, "laituri", portti);
        }

        // --- M-osa (huoneet 6–10): edistys pelin tilasta Ydin MVihjeille ---
        int mVaihe = -1;
        static bool MOsassa()
        {
            var k = SeikkailuKappeli.Aktiivinen;
            return k != null && k.Arvoitus.Vaihe == KappelinArvoitus.Valmis || (SeikkailuTietokerros.Aktiivinen?.Huone ?? 0) >= 6;
        }

        static Vector3 U((double X, double Y, double Z) q) => new Vector3((float)q.X, (float)q.Y, (float)-q.Z);
        static Vector3? Merkki(string nimi) => MVihjeet.Paikka(SeikkailuKavely.Data, nimi) is (double, double, double) q ? U(q) : (Vector3?)null;

        /// <summary>Komeron ydin (SeikkailuKomero.Ydin, tai yksityinen ydin-kenttä heijastuksella, kunnes julkinen on lisätty).</summary>
        static Komero KomeroYdin()
        {
            var k = SeikkailuKomero.Aktiivinen; if (k == null) return null;
            var t = typeof(SeikkailuKomero);
            if (t.GetProperty("Ydin")?.GetValue(k) is Komero y) return y;
            return t.GetField("ydin", System.Reflection.BindingFlags.Instance | System.Reflection.BindingFlags.NonPublic)?.GetValue(k) as Komero;
        }

        static MEdistys MTila(SeikkailuPelaaja p)
        {
            var es = SeikkailuEsineet.Aktiivinen; var pp = p.transform.position; var d = SeikkailuKavely.Data;
            var komero = KomeroYdin(); var pako = SeikkailuPako.Aktiivinen?.Ydin;
            bool Lahella(Vector3? a, string merkki, float m) => a is Vector3 v && Merkki(merkki) is Vector3 w && (v - w).sqrMagnitude < m * m;
            int seuraava = -1; if (komero != null) for (int i = 0; i < komero.Tiilet.Maara; i++) if (!komero.Tiilet.Irti(i)) { seuraava = i; break; }
            bool komeroAlkanut = komero != null && (seuraava != 0 || komero.Auki);
            var e = new MEdistys
            {
                Naamio = es != null && es.Naamio, KulhoKadessa = es?.Kadessa == "keittokulho",
                KulhoPoydalla = Lahella(es?.Paikka("keittokulho"), "esine:kulho-poydalle", 1.5f), Avaimet = es != null && es.Avaimet.Contains("avainrengas"),
                OviAuki = Askelaani.Osa(d, pp.x, pp.y, -pp.z) == "muurikaytava",   // ovi auki ≈ pelaaja muurikäytävän puolella
                Koysikieppi = es?.Kadessa == SeikkailuEsineet.Koysikieppi, KoysiSakarassa = Lahella(es?.Paikka(SeikkailuEsineet.Koysikieppi), "koysi:sakara", 0.8f),
                Ote = p.OteKiipeily?.Ote ?? 0, SeuraavaTiili = komero != null ? seuraava : 0,
                KiipeilyValmis = komeroAlkanut || Lahella(pp, "komero:kellotorni", 2f) || pako != null && pako.Vaihe != PakoVaihe.Odottaa,
                ArkkuAuki = komero != null && komero.Auki || pako != null && pako.Vaihe != PakoVaihe.Odottaa,
                Kilpi1 = komero?.Lukko.Kilpi1 ?? 0, Kilpi2 = komero?.Lukko.Kilpi2 ?? 0, KilpiTavoite = komero?.Lukko.TavoiteAste ?? 45, KilpiSallittu = komero?.Lukko.SallittuAste ?? 10,
                Pako = pako?.Vaihe ?? PakoVaihe.Odottaa,
            };
            if (e.KoysiSakarassa) e.Koysikieppi = true;
            return e;
        }

        static Vector3? MKohde(SeikkailuPelaaja p)
        {
            var e = MTila(p); var pp = p.transform.position;
            return Merkki(MVihjeet.Kohde(e, SeikkailuKavely.Data, pp.x, pp.y, -pp.z));
        }

        /// <summary>Vihje heti (anteeksianto: 3. kiinnijäänti samassa huoneessa → taso 2 tarkistuspisteessä).</summary>
        public void Pakota(int taso, string syy) { var p = SeikkailuPelaaja.Aktiivinen; if (p != null) Nayta(p, taso, syy); }

        void Nayta(SeikkailuPelaaja p, int taso, string syy, Vector3? annettu = null)
        {
            var kohde = annettu ?? Kohde(p);
            if (kohde == null) { kirjaa?.Invoke($"seikkailu: vihje {taso} ({syy}): ei kohdetta"); return; }
            var q = kohde.Value; var d = SeikkailuKavely.Data;
            var savy = ValoVihje.SavyOsassa(d != null ? Askelaani.Osa(d, q.x, q.y, -q.z) : null, q.y);
            valo.Aloita(taso, (q.x, q.y, -q.z), savy);
            var (r, g, b) = ValoVihje.Vari(savy); var vari = new Color((float)r, (float)g, (float)b);
            if (kimallus == null) kimallus = SeikkailuValot.Hehku(transform, Vector3.zero, vari, 0f, KimallusKantama, true, DioraamaNayttamo.Kerros);
            if (kimallus != null) { kimallus.transform.position = q + Vector3.up * KimallusNosto; kimallus.color = vari; kimallus.intensity = 0f; }
            SeikkailuAanet.SoitaTaiVara("vihje-kimallus", "hopea-kilahdus", q + Vector3.up * KimallusNosto, taso == 1 ? 0.25f : 0.35f);   // oma hento ääni (Pelikoodari), vara löytöääni
            kirjaa?.Invoke($"seikkailu: vihje {taso} ({syy}) → {q} ({savy})");
        }

        /// <summary>Vihjeen kohde (pelattavuusmalli 5, huoneet 2–5): kappelissa käsikirjoituksen järjestys, muualla seuraava ovi tai heitettävä.</summary>
        static Vector3? Kohde(SeikkailuPelaaja p)
        {
            var pp = p.transform.position;
            if (SeikkailuTyrma.Aktiivinen is SeikkailuTyrma ty) return ty.VihjeKohde();
            if (MOsassa()) return MKohde(p);
            var es = SeikkailuEsineet.Aktiivinen; var ky = SeikkailuKynttilat.Aktiivinen; var k = SeikkailuKappeli.Aktiivinen;
            if (k != null && k.Nyt != SeikkailuKappeli.Vaihe.Odottaa && ky != null)
            {
                if (es != null && es.Kadessa is string kd && (kd == "kalkki" || kd == "pateeni") && SeikkailuEsineet.Alttari is Vector3 al) return al;
                if (es?.Paikka("kalkki") is Vector3 ka) return ka;
                if (es?.Paikka(SeikkailuEsineet.Nyytti) is Vector3 ny && es.Irrottamaton(ny) == null) return ny;
                if (ky.Ydin.OmaKynttila && !ky.Ydin.OmaPalaa) return ky.IkuinenValo;
                if (!ky.LuukkuAuki && !luukkuNahty) return ky.Luukku;
                if (!ky.SaumatNakyvat && SeikkailuKynttilat.Ontto is Vector3 on) return on;
                if (es?.Irrottamaton(pp) is Vector3 kivi) return kivi;
                return SeikkailuKynttilat.Ontto;
            }
            var d = SeikkailuKavely.Data;
            Vector3? Merkki(string n) { if (d != null) foreach (var m in d.Merkit) if (m.Nimi == n) return new Vector3((float)m.X, (float)m.Y, (float)-m.Z); return null; }
            int huone = SeikkailuTietokerros.Aktiivinen != null ? SeikkailuTietokerros.Aktiivinen.Huone : 0;
            if (huone == 3 && es?.Heitettava(pp) is Vector3 h) return h;
            if (huone <= 2) return Merkki("ovi:porttikaytava-T102-alku") ?? Merkki("ovi:kappeli-alku");
            if (huone == 3) return Merkki("ovi:kirkkotorni-piha");
            return Merkki("ovi:kappeli-alku");
        }
        static bool luukkuNahty;

        public static void Poista() { var a = Aktiivinen; Aktiivinen = null; if (a != null) Destroy(a.gameObject); }

        void OnDestroy()
        {
            if (Aktiivinen == this) Aktiivinen = null;
            if (SeikkailuPelaaja.VihjePyydetty == (Func<bool>)Pyydetty) SeikkailuPelaaja.VihjePyydetty = null;
            SeikkailuVartijat.Tarkistuspiste -= UusiOsa;
            SeikkailuEsineet.Nostettiin -= Edistys; SeikkailuEsineet.AsetettiinAlttarille -= Edistys; SeikkailuEsineet.Raapaistiin -= Edistys0;
            SeikkailuKynttilat.LuukkuAani -= EdistysP;
            SeikkailuVartijat.RiitaAlkoi -= laituri.RiitaAlkoi;
        }
    }
}
