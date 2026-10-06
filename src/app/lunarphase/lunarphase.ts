import { Component } from '@angular/core';

interface LunarPhaseInfo {
  date: Date;
  phaseName: string;
  illumination: number;
  daysInCycle: number;
}

@Component({
  imports: [],
  selector: 'app-lunarphase',
  styleUrl: './lunarphase.css',
  templateUrl: './lunarphase.html',
})
// Lunar Phase Calculator for Nocturnal Missions
// Helps raccoons predict upcoming lunar phases for optimal scavenging and dumpster raids

export class Lunarphase {

private lunarCycle: number;
private referenceNewMoon: Date;
readonly currentPhase: LunarPhaseInfo;



  constructor() {
    // Known new moon date (reference point)
    this.referenceNewMoon = new Date('2000-01-06');
    this.lunarCycle = 29.53058867; // days
    this.currentPhase = this.calculatePhase(new Date());
  }

  /**
   * Calculate the lunar phase for a given date
   * @param {Date} date - The date to check lunar phase for
   * @returns {Object} - Phase info including name and illumination percentage
   */
  calculatePhase(date: Date): LunarPhaseInfo {
    const daysSinceReference = (date.getTime() - this.referenceNewMoon.getTime()) / (1000 * 60 * 60 * 24);
    const daysInCycle = daysSinceReference % this.lunarCycle;
    const cycleProgress = daysInCycle / this.lunarCycle;
    const illumination = Math.round(((1 - Math.cos(2 * Math.PI * cycleProgress)) / 2) * 100);

    let phaseName;
    if (daysInCycle < 1.84) phaseName = 'New Moon';
    else if (daysInCycle < 7.38) phaseName = 'Waxing Crescent';
    else if (daysInCycle < 9.23) phaseName = 'First Quarter';
    else if (daysInCycle < 14.77) phaseName = 'Waxing Gibbous';
    else if (daysInCycle < 16.61) phaseName = 'Full Moon';
    else if (daysInCycle < 22.15) phaseName = 'Waning Gibbous';
    else if (daysInCycle < 23.99) phaseName = 'Last Quarter';
    else phaseName = 'Waning Crescent';

    return { date, phaseName, illumination, daysInCycle: Math.round(daysInCycle * 10) / 10 };
  }

  /**
   * Get lunar phases for upcoming days
   * @param {number} daysAhead - Number of days to predict ahead
   * @returns {Array} - Array of phase predictions
   */
  predictUpcoming(daysAhead = 30) {
    const predictions = [];
    const today = new Date();

    for (let i = 0; i <= daysAhead; i++) {
      const futureDate = new Date(today);
      futureDate.setDate(futureDate.getDate() + i);
      predictions.push(this.calculatePhase(futureDate));
    }

    return predictions;
  }

  /**
   * Find the next full moon (best for dumpster raids!)
   * @returns {Object} - Next full moon date and details
   */
  findNextFullMoon() {
    const predictions = this.predictUpcoming(365);
    return predictions.find(p => p.phaseName === 'Full Moon');
  }

  /**
   * Check if tonight is good for a mission
   * @returns {string} - Mission difficulty assessment
   */
  assessNightMission() {
    const tonight = this.calculatePhase(new Date());
    const illumination = tonight.illumination;

    if (illumination > 70) return 'Bright night - High visibility, use caution!';
    if (illumination > 40) return 'Moderate visibility - Standard mission conditions';
    if (illumination > 10) return 'Dark night - Excellent for stealth operations';
    return 'Very dark night - Perfect for covert dumpster raids!';
  }
}

export default Lunarphase;