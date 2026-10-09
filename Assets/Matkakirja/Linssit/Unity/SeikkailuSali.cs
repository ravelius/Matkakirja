// HISTORIAMOOTTORI M-OSA HUONE 6: VOUDIN SALI (Siirtoseppä 8.10.2026; pelattavuusmalli-olavinlinna.md 8.2 huone 6 vaiheet 5–6).
// Vouti (istuu:vouti) katsoo pöytäänsä; keittokulho laskettuna esine:kulho-poydalle-merkin luo (alle 1,5 m) aloittaa kiistan aitan
// hoitajan (seisoo:aitan-hoitaja) kanssa: 30 s, jonka aikana vouti kääntyy kahdesti 6 s:ksi hoitajaan (8–14 s ja 20–26 s); kiista toistuu
// 20 s:n välein (Ydin VoudinKiista, LS2 8.10.). Avainrengas otetaan vain, kun vouti ei katso sitä (kulma yli 50° tai yli 5 m), muuten ote ranteesta (irtipääsy tai tyrmä).
// Kiistan repliikit (noin 30 s) tarvitsevat omistajan luvan: nyt kiista on hiljainen (loki), ajoitus valmiina.
using System;
using Matkakirja.Linssit.Seikkailu;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public sealed class SeikkailuSali : MonoBehaviour
    {
        public static SeikkailuSali Aktiivinen { get; private set; }
        public const string Vouti = "istuu-vouti";
        readonly VoudinKiista ydin = new VoudinKiista();
        Vector3 kulhoPaikka, hoitaja; double voudinYaw; bool hoitajaOn; Action<string> kirjaa;
        public bool KiistaKay => ydin.KiistaKay;
        /// <summary>Vouti katsoo hoitajaan (katseikkuna).</summary>
        public bool KatsooPois => ydin.KatsooPois;

        public static void Luo(KavelyData d, Transform isa, Action<string> kirjaa)
        {
            Poista();
            KavelyMerkki mk = null, mh = null, mv = null;
            foreach (var m in d.Merkit) { if (m.Nimi == "esine:kulho-poydalle") mk = m; else if (m.Nimi == "seisoo:aitan-hoitaja") mh = m; else if (m.Nimi == "istuu:vouti") mv = m; }
            if (mk == null || mv == null) return;
            var go = new GameObject("Seikkailu sali") { layer = DioraamaNayttamo.Kerros };
            go.transform.SetParent(isa, false);
            var s = go.AddComponent<SeikkailuSali>(); s.kirjaa = kirjaa; Aktiivinen = s;
            s.kulhoPaikka = new Vector3((float)mk.X, (float)mk.Y, (float)-mk.Z);
            if (mh != null) { s.hoitaja = new Vector3((float)mh.X, (float)mh.Y, (float)-mh.Z); s.hoitajaOn = true; }
            s.voudinYaw = mv.KiertoY is double ky ? 180 - ky * 180 / Math.PI : 0;
            SeikkailuEsineet.Laskettiin -= s.Laskettu; SeikkailuEsineet.Laskettiin += s.Laskettu;
            kirjaa?.Invoke("seikkailu: voudin sali (kulho → kiista, avaimet)");
        }

        void Laskettu(string id, Vector3 paikka)
        {
            if (id != "keittokulho" || !ydin.KulhoLaskettu(Vector3.Distance(paikka, kulhoPaikka))) return;
            kirjaa?.Invoke("seikkailu: kulho voudin pöydällä → vouti syö, kiista aitan hoitajan kanssa alkaa");
            SeikkailuAanet.SoitaTaiVara("kulho-poyta", "kivi-lasku", paikka, 0.6f, 1.3f);
            SeikkailuTallentaja.Aktiivinen?.Tallenna("m: kulho pöydällä");   // kieli: ei (tekninen)
        }

        void KiistaAani()
        {
            // Kiista yhtenä ottona (noin 30 s, vouti ja hoitaja vuorotellen; hoitajan vuorot katseikkunoissa 8–14 s ja 20–26 s).
            var vh = SeikkailuVartijat.Hahmo(Vouti);
            SeikkailuRepliikit.SoitaTaiVara("kiista-vouti-hoitaja", null, (vh is (Vector3 vp, double _) ? vp : kulhoPaikka) + Vector3.up * 1.6f);
        }

        void Update()
        {
            ydin.Paivita(Time.deltaTime);
            if (ydin.Alkoi) { ydin.Alkoi = false; KiistaAani(); }
            if (!ydin.Kaantyi) return;
            ydin.Kaantyi = false;
            var vh = SeikkailuVartijat.Hahmo(Vouti);
            double yaw = voudinYaw;
            if (ydin.KatsooPois && hoitajaOn && vh is (Vector3 vp, double _)) { var d = hoitaja - vp; yaw = Math.Atan2(d.x, d.z) * 180 / Math.PI; }
            SeikkailuVartijat.Katso(Vouti, yaw);
            kirjaa?.Invoke(ydin.KatsooPois ? "seikkailu: vouti kääntyy hoitajaan (6 s)" : "seikkailu: vouti kääntyy takaisin pöytään");
        }

        /// <summary>Saako pelaaja ottaa avainrenkaan nyt: vouti ei katso sitä (kääntynyt hoitajaan, tai kulma tai matka liian suuri).</summary>
        public bool SaaOttaa(SeikkailuPelaaja p)
        {
            if (p == null) return true;
            var vh = SeikkailuVartijat.Hahmo(Vouti);
            if (!(vh is (Vector3 vp, double vy))) return true;
            var d = p.transform.position - vp;
            return ydin.SaaOttaa(d.x, d.z, vy);
        }

        public void TaytaM(MTila m) => m.Kulho = ydin.Kiista >= 0;
        public void PalautaM(MTila m)
        {
            if (!m.Kulho || !ydin.KulhoLaskettu(0)) return;
            SeikkailuEsineet.Aktiivinen?.Siirra("keittokulho", kulhoPaikka + Vector3.up * 0.05f);
            kirjaa?.Invoke("seikkailu: jatko: kulho voudin pöydällä, kiista käynnissä");
        }

        public static void Poista() { var a = Aktiivinen; Aktiivinen = null; if (a != null) Destroy(a.gameObject); }
        void OnDestroy() { SeikkailuEsineet.Laskettiin -= Laskettu; if (Aktiivinen == this) Aktiivinen = null; }
    }
}
