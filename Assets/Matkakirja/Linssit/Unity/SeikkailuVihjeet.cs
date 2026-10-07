// HISTORIAMOOTTORI: PULUN VIHJEET UNITYSSA (Siirtoseppä 7.10.2026; pelattavuusmalli kohta 5; ydin Seikkailu.Vihjeet). Pulun reunakuvan
// napautus (Natiivi-UI → SeikkailuPelaaja.PuluVihje → VihjePyydetty) tai jumi (180 s ilman edistystä) antaa vihjeen ilman sanoja:
// taso 1 kujerrus kohteen suunnasta 1,5 m:n päästä, taso 2 kujerrus kohteesta, taso 3 nokkaisu kohteessa. Kohde huoneen ja kappelin
// vaiheen mukaan. Pulun lento maailmassa (malli) liitetään tähän, kun Linnanrakentajan pulu-glb on paketissa; nyt ääni kertoo suunnan.
using System;
using Matkakirja.Linssit.Seikkailu;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public sealed class SeikkailuVihjeet : MonoBehaviour
    {
        public static SeikkailuVihjeet Aktiivinen { get; private set; }
        readonly Vihjeet ydin = new Vihjeet();
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
            Nayta(p, taso, "pyyntö");
            return true;
        }

        void Update()
        {
            var p = SeikkailuPelaaja.Aktiivinen; if (p == null) return;
            var k = SeikkailuKappeli.Aktiivinen;
            bool keskustelu = k != null && k.Nyt == SeikkailuKappeli.Vaihe.Kohtaus;
            if (ydin.Paivita(Time.deltaTime, Vaara(p), keskustelu || p.Eleessa) == 2) Nayta(p, 2, "jumi");
        }

        /// <summary>Vihje heti (anteeksianto: 3. kiinnijäänti samassa huoneessa → taso 2 tarkistuspisteessä).</summary>
        public void Pakota(int taso, string syy) { var p = SeikkailuPelaaja.Aktiivinen; if (p != null) Nayta(p, taso, syy); }

        void Nayta(SeikkailuPelaaja p, int taso, string syy)
        {
            var kohde = Kohde(p);
            if (kohde == null) { kirjaa?.Invoke($"seikkailu: vihje {taso} ({syy}): ei kohdetta"); return; }
            var c = p.transform.position + Vector3.up * 1.5f; var q = kohde.Value;
            var suunta = q - c; suunta.y = 0;
            var paikka = taso == 1 ? c + (suunta.sqrMagnitude > 1e-4f ? suunta.normalized : p.Hahmo.forward) * 1.5f : q + Vector3.up * 0.3f;
            SeikkailuAanet.Soita(taso == 3 ? "pulu-nokka" : "pulu-kujerrus", paikka, 0.8f);
            if (taso == 3) SeikkailuAanet.Soita("pulu-kujerrus", paikka, 0.5f);
            kirjaa?.Invoke($"seikkailu: vihje {taso} ({syy}) → {q}");
        }

        /// <summary>Vihjeen kohde (pelattavuusmalli 5, huoneet 2–5): kappelissa käsikirjoituksen järjestys, muualla seuraava ovi tai heitettävä.</summary>
        static Vector3? Kohde(SeikkailuPelaaja p)
        {
            var pp = p.transform.position;
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
        }
    }
}
