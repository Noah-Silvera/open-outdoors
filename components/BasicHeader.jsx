export function BasicHeader({children}){
  return (
    <header>
        <h1 className='header-font text-center mx-auto py-5 md:py-10 bg-tertiary-light px-2'>{children}</h1>
    </header>
  )
}
