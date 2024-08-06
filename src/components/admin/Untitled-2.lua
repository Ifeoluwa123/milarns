
    <div className="mt-[3rem]">
    <h1 className='font-[600] text-[1rem]'>Provide staff bank details</h1>

    <div className=" mt-[1.5rem] md:grid md:grid-cols-2 lg:grid-cols-3 gap-y-[1rem] md:flex-row items-center w-full md:gap-x-[2rem]">
    <div className=" w-full mb-[2rem] md:mb-0">
    <TextField
        label="First name"
        placeholder="e.g.First bank"
        // onClick={''}
        type="text"
        paddingY="py-[0.5rem]"
        fontSize="font-[500]"
        textSize="text-[0.875rem]"
        defaultValue={employeeData.first_name}
    />
    </div>
    <div className=" w-full mb-[2rem] md:mb-0">
    <TextField
        label="Last name"
        placeholder="e.g.First bank"
        // onClick={''}
        type="text"
        paddingY="py-[0.5rem]"
        fontSize="font-[500]"
        textSize="text-[0.875rem]"
        defaultValue={employeeData.last_name}
    />
    </div>
  
    <div className=" w-full mb-[2rem] md:mb-0">
    <TextField
        label="Account number"
        placeholder="e.g.3099******"
        // onClick={''}
        type="text"
        paddingY="py-[0.5rem]"
        fontSize="font-[500]"
        textSize="text-[0.875rem]"
        defaultValue={ data && data.account_number}
    />
    </div>
    <div className=" w-full mb-[2rem] md:mb-0">
    <TextField
            label="Account name"
            type="text"
            placeholder="e.g.Joy johnson"
            fontSize="font-[500]"
            textSize="text-[0.875rem]"
            paddingY="py-[0.5rem]"
            defaultValue={ data && data.account_name}

    />
    </div>
    </div>
    </div>