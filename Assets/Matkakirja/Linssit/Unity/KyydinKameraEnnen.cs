// KYYDIN KAMERA ENNEN LAATTOJEN VALINTAA (Päätoimittaja 3.10.2026, Cupolan veto: yhden ruudun siniset kolmiot).
// Juurisyy: ISS-kyydin kamera kirjoitettiin LinssiOhjaimen Updatessa (suoritusjärjestys 0), samassa lokerossa kuin
// Cesium3DTilesetin Update, joka valitsee ja karsii laatat kameran asennosta. Kun Cesium ajoi ensin, se karsi edellisen kehyksen
// asennolla, ja nopeassa käännössä näkymään tulevat laatat puuttuivat yhden kehyksen: aukosta näkyi Pohjapallon tasainen,
// sävyttämätön sininen (suorat laattareunat). Tämä ajaa kyydissä olevan Astronautin linssin päivityksen (veto + kamera) ennen
// Cesiumia (−50: LiikeLaatat −100 valitsee ensin valintakameran) ja LinssiOhjain ohittaa saman kehyksen toisen ajon
// (AstronauttiSovitin.Paivita, kehysvahti). Muut linssit ja kyydin ulkopuoli ennallaan.
using System;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    [DefaultExecutionOrder(-50)]
    public sealed class KyydinKameraEnnen : MonoBehaviour
    {
        /// <summary>Aktiivisen linssin varhainen päivitys (asettaa AstronauttiSovitin; null = ei mitään).</summary>
        public static Action Ajo;

        void Update() => Ajo?.Invoke();
    }
}
