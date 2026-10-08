// KATSE YLÖS KORISTA, UNITY-OSA (omistaja 8.10. 21.1x, PT 22.0x): korinäkymässä yhden sormen (tai hiiren) pystyveto nostaa
// katsetta oppaan kehyksen päälle (Ydin KoriKatse: enintään +45° horisontin yläpuolelle, irrotus palauttaa pehmeästi), jolloin
// kupu näkyy. Ele ei ala käyttöliittymän päältä (SyoteLukko.Peittaa: tapit, napit, Pulu), ja pallon oma yhden sormen veto on
// sillä aikaa pois (PalloKierto.YhdenSormenVetoMuualla, kuten CupolaVeto). Nosto tehdään vain piirron ajaksi
// (beginContextRendering → endContextRendering palauttaa), joten oppaan kehys, laattojen valinta ja logiikka näkevät kehyksen
// asennon; korin kamera on kaupunkikameran lapsi ja seuraa, kupu pysyy maailman pystyssä. A/B `opas katse 0|1` (oletus 1).
using System.Collections.Generic;
using Matkakirja.Linssit.Kierros;
using UnityEngine;
using UnityEngine.InputSystem;
using UnityEngine.Rendering;
using Kosketus = UnityEngine.InputSystem.EnhancedTouch.Touch;

namespace Matkakirja.Natiivi
{
    public sealed class KoriKatseVeto
    {
        public static bool Kaytossa = true;
        readonly KoriKatse katse = new KoriKatse();
        PalloKierto kierto; Camera kamera;
        bool alhaalla, ohita, vetoAsetettu, kytketty, muutettu;
        Vector2 ed; Quaternion talteen;
        public double Ylos => katse.Ylos;

        public void Paivita(bool korissa, Camera kam, PalloKierto pk)
        {
            kierto = pk ?? kierto; kamera = kam;
            bool sallittu = Kaytossa && korissa && kam != null && !(pk != null && pk.SyoteEstetty);
            if (pk != null && sallittu != vetoAsetettu) { pk.YhdenSormenVetoMuualla = sallittu; vetoAsetettu = sallittu; }
            double kulma = kam != null ? Mathf.Asin(Mathf.Clamp(kam.transform.forward.y, -1f, 1f)) * Mathf.Rad2Deg : 0;
            var sormet = Kosketus.activeTouches;
            int n = sormet.Count;
            bool painettu = n == 1 || (n == 0 && Mouse.current != null && Mouse.current.leftButton.isPressed);
            Vector2 px = n >= 1 ? sormet[0].screenPosition : Mouse.current != null ? Mouse.current.position.ReadValue() : Vector2.zero;
            if (n > 1 || !painettu || !sallittu)
            {
                if (alhaalla) katse.Nosta();
                alhaalla = n > 1; ohita = n > 1;
            }
            else if (!alhaalla)
            {
                alhaalla = true; ed = px;
                ohita = SyoteLukko.Peittaa(px);
                if (!ohita) katse.Paina();
            }
            else if (!ohita)
            {
                katse.Liiku(px.y - ed.y, kam.fieldOfView / Mathf.Max(1, Screen.height), kulma);
                ed = px;
            }
            katse.Paivita(Time.unscaledDeltaTime, kulma);
            PalloKori.KatseYlos = (float)katse.Ylos;
            bool tarvitaan = katse.Ylos > 0;
            if (tarvitaan && !kytketty) { RenderPipelineManager.beginContextRendering += Ennen; RenderPipelineManager.endContextRendering += Jalkeen; kytketty = true; }
            else if (!tarvitaan && kytketty) Irrota();
            if (katse.Vetaa || tarvitaan) Ruudunpaivitys.Herata();
        }

        void Ennen(ScriptableRenderContext _, List<Camera> __)
        {
            if (kamera == null || katse.Ylos <= 0) return;
            var t = kamera.transform;
            talteen = t.rotation;
            t.rotation = Quaternion.AngleAxis(-(float)katse.Ylos, t.right) * talteen;   // nosto kameran oman sivuakselin ympäri
            muutettu = true;
        }

        void Jalkeen(ScriptableRenderContext _, List<Camera> __)
        {
            if (muutettu && kamera != null) kamera.transform.rotation = talteen;
            muutettu = false;
        }

        void Irrota()
        {
            RenderPipelineManager.beginContextRendering -= Ennen; RenderPipelineManager.endContextRendering -= Jalkeen;
            kytketty = false;
        }

        public string Tila() => $"katse ylös {(Kaytossa ? "käytössä" : "pois")}, nosto {katse.Ylos:F1}°, {(katse.Vetaa ? "vedetään" : "vapaa")}";

        public void Pois()
        {
            if (kytketty) Irrota();
            if (muutettu && kamera != null) kamera.transform.rotation = talteen;
            muutettu = false; alhaalla = ohita = false; katse.Nosta(); PalloKori.KatseYlos = 0;
            if (kierto != null && vetoAsetettu) { kierto.YhdenSormenVetoMuualla = false; vetoAsetettu = false; }
        }
    }
}
