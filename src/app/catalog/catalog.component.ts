import { Component } from '@angular/core';

import { UserRepositoryService } from '../services/user-repository.service'
import { CatalogRepositoryService } from './catalog-repository.service';

@Component({
  styleUrls: ['./catalog.component.css'],
  templateUrl: './catalog.component.html'
})
export class CatalogComponent {
  classes: any[];
  visibleClasses: any[];

  constructor(private userRepository: UserRepositoryService, private catalogRepository: CatalogRepositoryService) {}

  ngOnInit() {
    this.catalogRepository.getCatalog()
      .subscribe(classes => { this.classes = classes; this.applyFilter('')});
  }

  enroll(classToEnroll) {
    classToEnroll.processing = true;
    this.userRepository.enroll(classToEnroll.classId)
      .subscribe(
        null,
        (err) => {console.error(err); classToEnroll.processing = false}, // add a toast message or something
        () => {classToEnroll.processing = false; classToEnroll.enrolled = true; },
      );
  }

  drop(classToDrop) {
    classToDrop.processing = true;
    this.userRepository.drop(classToDrop.classId)
      .subscribe(
        null,
        (err) => { console.error(err); classToDrop.processing = false}, // add a toast message or something
        () => {classToDrop.processing = false; classToDrop.enrolled = false; }
      );
  }

  applyFilter(filter) {
    if (!filter) {
      return this.visibleClasses = this.classes;
    }

    if (filter === 'GEN') {
      return this.showOnlyGeneralCourses();
    }

    return this.visibleClasses = this.classes.filter(c => c.course.courseNumber.startsWith(filter));
  }

  /**
   * do not include the return statement here, leave it in the function calling this method
   * now I will be working in moduleOrganizer branch to show new module organization
   */
  showOnlyGeneralCourses() {
     this.visibleClasses = this.classes.filter(c =>
      !c.course.courseNumber.startsWith('CH') &&
      !c.course.courseNumber.startsWith('PO') &&
      !c.course.courseNumber.startsWith('SP'));;
  }
















  // showOnlyGeneralCourses(){
  //   this.visibleClasses = this.classes.filter(c =>
  //     !c.course.courseNumber.startsWith('CH') &&
  //     !c.course.courseNumber.startsWith('PO') &&
  //     !c.course.courseNumber.startsWith('SP'));
  // }

}
