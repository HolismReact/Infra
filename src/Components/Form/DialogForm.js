// const DialogForm = ({ }) => {
//     return <Dialog
//         /*dir={app.isRtl() ? "rtl" : "ltr"}*/
//         open={isCreationDialogOpen}
//         id='dialogForm'
//         aria-labelledby="form-dialog-title"
//         fullWidth
//         maxWidth='md'
//         TransitionProps={{
//             onEntered: () => {
//                 var firstField = document.querySelector('#dialogForm .field:first-child input');
//                 if (firstField && firstField.focus) {
//                     firstField.focus();
//                 }
//             }
//         }}
//     >
//         <DialogTitle id="form-dialog-title">{app.t(title)}</DialogTitle>
//         <DialogContent>
//             <form
//                 noValidate
//                 onSubmit={handleSubmit}
//             >
//                 <div id='fields'>
//                     {inputs}
//                 </div>
//             </form>
//         </DialogContent>
//         <DialogActions>
//             <div id='actions' className='mt-4'>
//                 {
//                     actions ||
//                     <div className="mr-6 mb-6" >
//                         {
//                             progress
//                                 ?
//                                 <CircularProgress size={30} />
//                                 :
//                                 <>
//                                     <Button
//                                         tabIndex="-1"
//                                         variant="outlined"
//                                         onClick={() => setIsCreationDialogOpen(false)}
//                                     >
//                                         {app.t('Cancel')}
//                                     </Button>
//                                     <Button
//                                         variant="outlined"
//                                         className={'ml-2' + (isValid ? " bg-green-200" : "")}
//                                         onClick={handleSubmit}
//                                         disabled={!isValid}
//                                     >
//                                         {app.t('Save')}
//                                     </Button>
//                                 </>
//                         }
//                     </div>
//                 }
//             </div>
//         </DialogActions>
//     </Dialog>
// }