// HISTORIAMOOTTORI: KÄSITTELY KÄSIN, ESINEPUOLI (Siirtoseppä 8.10.2026; pelattavuusmalli kohta 6 "Käsittele käsin: ovi, arkun kilvet",
// Amnesian tapaan ilman kauhua). Natiivi-UI:n syötepuoli SeikkailuTapit (KasittelyAlkaa, Kasittely, OtaKasittely; Ydin KasittelyVeto).
// Käsiteltävät rekisteröidään (tyrmän ovi; M-osassa muurikäytävän ovi ja arkun kilvet): paikka, tarjolla-ehto ja kääntö (asteet,
// narahti). Kosketus: veto esineestä alkaen (SeikkailuTapit kysyy KasittelyAlkaa(px)). Mac: vasen pohjassa + hiiri esineen päällä
// (kohdistin tai lukittuna ruudun keskellä). Peliohjain: X pohjassa + oikea sauva, kun esine on katseen keskellä. Käsittelyn ajan katse
// ei käänny (SeikkailuPelaaja kysyy Kaynnissa). Hidas veto (alle 30°/s) hiljainen, nopea narahtaa (4 m, kääntäjä päättää äänen).
// Napautus avaa edelleen hitaasti ja hiljaa (1,5 s) toimintonapin kautta; ensimmäisen palan luukku ja kivet ennallaan.
using System;
using System.Collections.Generic;
using Matkakirja.Linssit.Seikkailu;
using UnityEngine;
using UnityEngine.InputSystem;

namespace Matkakirja.Natiivi
{
    public sealed class SeikkailuKasittely : MonoBehaviour
    {
        public sealed class Kasiteltava
        {
            public string Nimi;
            public Func<Vector3> Paikka;
            public Func<SeikkailuPelaaja, bool> Tarjolla;
            /// <summary>Kääntö vedon asteina (x + oikealle) ja tieto, ylittikö nopeus narahdusrajan tällä kehyksellä.</summary>
            public Action<SeikkailuPelaaja, double, bool> Kaanna;
            public Action Loppui;
        }

        public const float UlottumaM = 1.6f, SadeM = 0.45f, MacPtPerPx = 0.5f, SauvaAsteS = 140f;
        static readonly List<Kasiteltava> kohteet = new List<Kasiteltava>();
        static Kasiteltava aktiivinen; static int narahduksetEnnen; static SeikkailuKasittely instanssi;
        static bool omaVeto;   // Mac tai peliohjain syöttää vetoon (kosketuksessa SeikkailuTapit)
        /// <summary>Käsittely käynnissä: katse ei käänny (SeikkailuPelaaja).</summary>
        public static bool Kaynnissa => aktiivinen != null && SeikkailuTapit.Kasittely.Kaynnissa;

        public static void Lisaa(Kasiteltava k)
        {
            if (k == null) return;
            kohteet.RemoveAll(x => x.Nimi == k.Nimi);
            kohteet.Add(k);
            Varmista();
        }
        /// <summary>Onko ruudun pisteen alla käsiteltävä (Mac-napsautus ja peliohjaimen X jättävät silloin toiminnon käsittelylle).</summary>
        public static bool Alla(Vector2 px) => kohteet.Count > 0 && Kohde(px) != null;
        public static bool KeskellaKohde() => Alla(new Vector2(Screen.width / 2f, Screen.height / 2f));
        public const double NapautusAste = 3;

        public static void Poista(string nimi) { kohteet.RemoveAll(x => x.Nimi == nimi); if (aktiivinen?.Nimi == nimi) aktiivinen = null; }

        static void Varmista()
        {
            if (instanssi != null) return;
            var go = new GameObject("Seikkailu käsittely");
            instanssi = go.AddComponent<SeikkailuKasittely>();
            SeikkailuTapit.KasittelyAlkaa = px => (aktiivinen = Kohde(px)) != null;
        }

        static Camera Kamera()
        {
            var p = SeikkailuPelaaja.Aktiivinen; var cam = Camera.main;
            var n = p != null ? p.GetComponentInParent<DioraamaNayttamo>() : null;
            return n != null && n.Kamera != null ? n.Kamera : cam;
        }

        /// <summary>Käsiteltävä ruudun pisteen alla (säde kamerasta ≤ 0,45 m esineestä), ulottuvilla ja tarjolla; muuten null.</summary>
        static Kasiteltava Kohde(Vector2 px)
        {
            var p = SeikkailuPelaaja.Aktiivinen; var cam = Kamera();
            if (p == null || cam == null || p.Eleessa || p.Otteessa) return null;
            var sade = cam.ScreenPointToRay(px);
            Kasiteltava paras = null; float pd = SadeM;
            foreach (var k in kohteet)
            {
                if (k.Tarjolla != null && !k.Tarjolla(p)) continue;
                var c = k.Paikka();
                if ((c - (p.transform.position + Vector3.up * 1.2f)).magnitude > UlottumaM) continue;
                float d = Vector3.Cross(sade.direction, c - sade.origin).magnitude;
                if (Vector3.Dot(sade.direction, c - sade.origin) > 0 && d < pd) { pd = d; paras = k; }
            }
            return paras;
        }

        void Update()
        {
            var p = SeikkailuPelaaja.Aktiivinen;
            var veto = SeikkailuTapit.Kasittely;
            if (p == null || kohteet.Count == 0) { if (omaVeto) { veto.Lopeta(); omaVeto = false; } aktiivinen = null; return; }
            float dt = Time.unscaledDeltaTime;
            // Mac: vasen pohjassa esineen päällä; peliohjain: X pohjassa ja esine katseen keskellä.
            var hiiri = Mouse.current; var gp = Gamepad.current;
            bool macAlkaa = hiiri != null && hiiri.leftButton.wasPressedThisFrame, gpAlkaa = gp != null && gp.buttonWest.wasPressedThisFrame;
            if (!veto.Kaynnissa && (macAlkaa || gpAlkaa))
            {
                var px = macAlkaa && Cursor.lockState != CursorLockMode.Locked ? hiiri.position.ReadValue() : new Vector2(Screen.width / 2f, Screen.height / 2f);
                var k = Kohde(px);
                if (k != null) { aktiivinen = k; veto.Aloita(); omaVeto = true; narahduksetEnnen = 0; }
            }
            if (omaVeto)
            {
                bool pohjassa = hiiri != null && hiiri.leftButton.isPressed || gp != null && gp.buttonWest.isPressed;
                if (!pohjassa)
                {
                    // Lyhyt painallus ilman vetoa = napautus: toiminto avaa hitaasti ja hiljaa (1,5 s).
                    if (Math.Abs(veto.AsteetX) + Math.Abs(veto.AsteetY) < NapautusAste) SeikkailuEsineet.ToimintoPyydetty = true;
                    veto.Lopeta(); omaVeto = false;
                }
                else
                {
                    var d = Vector2.zero;
                    if (hiiri != null && hiiri.leftButton.isPressed) d += hiiri.delta.ReadValue() * MacPtPerPx;
                    if (gp != null && gp.buttonWest.isPressed) d += gp.rightStick.ReadValue() * (SauvaAsteS / (float)KasittelyVeto.AsteitaPerPt) * dt;
                    veto.Liiku(d.x, d.y, dt);
                }
            }
            if (aktiivinen == null) return;
            var (ax, _) = veto.Ota();
            bool narahti = veto.Narahdukset > narahduksetEnnen; narahduksetEnnen = veto.Narahdukset;
            if (Math.Abs(ax) > 1e-4 || narahti) aktiivinen.Kaanna?.Invoke(p, ax, narahti);
            if (!veto.Kaynnissa) { var k = aktiivinen; aktiivinen = null; narahduksetEnnen = 0; k.Loppui?.Invoke(); }
        }

        void OnDestroy() { if (instanssi == this) { instanssi = null; SeikkailuTapit.KasittelyAlkaa = null; } }

        /// <summary>Seikkailu suljetaan: kohteet ja syötteen kytkentä pois.</summary>
        public static void Tyhjenna() { kohteet.Clear(); aktiivinen = null; if (instanssi != null) Destroy(instanssi.gameObject); }
    }
}
